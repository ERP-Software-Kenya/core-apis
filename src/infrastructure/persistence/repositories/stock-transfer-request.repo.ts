import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { EMovementType, EProductLogAction, InventoryEntity, ProductLogEntity, StockMovementEntity, StockTransferEntity, StockTransferRequestEntity } from '../entities';
import { StockTransferRequest } from '../../../application/modules/stock-transfers/domain';
import { EStockTransferRequestStatus } from '../../../application/shared/enums/e-stock-transfer-request-status';
import {
  IStockTransferRequestRepo,
  AcceptStockTransferRequestInput,
  ClaimStockTransferRequestInput,
  StockTransferRequestFilter,
} from '../../../application/modules/stock-transfers/i-stock-transfer-request.repo';
import { EStockTransferStatus } from '../../../application/shared/enums/e-stock-transfer-status';
import { randomUUID } from 'crypto';

@Injectable()
export class StockTransferRequestRepo
  extends BaseRepo<StockTransferRequestEntity, StockTransferRequest, string, PageableFilter<StockTransferRequestFilter>, Filter<StockTransferRequestFilter>>
  implements IStockTransferRequestRepo
{
  constructor(
    @InjectRepository(StockTransferRequestEntity) internalRepo: Repository<StockTransferRequestEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StockTransferRequestRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StockTransferRequestEntity, StockTransferRequest);
  }

  public override get idColumnName(): keyof StockTransferRequestEntity {
    return 'id';
  }

  public async findAllOpenForOrgAsync(organizationId: string, excludeLocationId: string): Promise<StockTransferRequest[]> {
    const entities = await this.internalRepo.find({
      where: { organizationId, status: EStockTransferRequestStatus.Open },
    });
    const filtered = entities.filter((entity) => entity.requestingLocationId !== excludeLocationId);
    return filtered.map((entity) => this.mapToModel(entity));
  }

  public async findAllForLocationAsync(organizationId: string, locationId: string): Promise<StockTransferRequest[]> {
    const entities = await this.internalRepo.find({
      where: { organizationId, requestingLocationId: locationId },
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => this.mapToModel(entity));
  }

  public async findUsersForLocationAsync(organizationId: string, locationId: string): Promise<string[]> {
    const rows = await this.internalRepo.manager
      .createQueryBuilder()
      .select('DISTINCT ur.user_id', 'userId')
      .from('core.user_roles', 'ur')
      .innerJoin('core.users', 'u', 'u.id = ur.user_id AND u.organization_id = :organizationId', { organizationId })
      .where('ur.store_id = :locationId', { locationId })
      .getRawMany<{ userId: string }>();
    return rows.map((row) => row.userId);
  }

  public async findAllUserIdsInOrgAsync(organizationId: string): Promise<string[]> {
    const rows = await this.internalRepo.manager
      .createQueryBuilder()
      .select('u.id', 'userId')
      .from('core.users', 'u')
      .where('u.organization_id = :organizationId AND u.is_active = true', { organizationId })
      .getRawMany<{ userId: string }>();
    return rows.map((row) => row.userId);
  }

  public async acceptAsync(input: AcceptStockTransferRequestInput): Promise<StockTransferRequest> {
    const id = await this.internalRepo.manager.transaction(async (manager) => {
      const request = await manager.findOne(StockTransferRequestEntity, {
        where: { id: input.requestId, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' },
      });
      if (!request) throw new NotFoundException(`Stock request ${input.requestId} not found`);
      if (request.status !== EStockTransferRequestStatus.Open) throw new BadRequestException('Stock request is not OPEN');
      if (request.requestingLocationId === input.acceptingLocationId) throw new BadRequestException('A store cannot accept its own request');
      const inventory = await manager.findOne(InventoryEntity, {
        where: { organizationId: input.organizationId, locationId: input.acceptingLocationId, productId: request.productId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!inventory) throw new BadRequestException('No inventory record found for this product at the accepting location');
      const quantity = Number(request.quantityRequested);
      const before = Number(inventory.quantityOnHand);
      const available = before - Number(inventory.quantityReserved);
      if (quantity > available) throw new BadRequestException(`Insufficient stock. Available: ${available}`);
      inventory.quantityOnHand = before - quantity;
      await manager.save(inventory);
      await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
        inventoryId: inventory.id, locationId: input.acceptingLocationId, productId: request.productId,
        performedById: input.acceptingUserId, referenceId: request.id, referenceType: 'stock_transfer_request',
        movementType: EMovementType.TransferOut, quantity, quantityBefore: before, quantityAfter: inventory.quantityOnHand,
      }));
      const transfer = await manager.save(StockTransferEntity, manager.create(StockTransferEntity, {
        organizationId: input.organizationId, fromLocationId: input.acceptingLocationId,
        toLocationId: request.requestingLocationId, transferNumber: `STR-${randomUUID()}`, status: EStockTransferStatus.Pending,
      }));
      request.status = EStockTransferRequestStatus.Accepted;
      request.acceptedByLocationId = input.acceptingLocationId;
      request.acceptedByUserId = input.acceptingUserId;
      request.acceptedAt = new Date();
      request.fulfillmentTransferId = transfer.id;
      await manager.save(request);
      await manager.save(ProductLogEntity, manager.create(ProductLogEntity, {
        organizationId: input.organizationId, productId: request.productId, inventoryId: inventory.id,
        locationId: input.acceptingLocationId, performedById: input.acceptingUserId,
        action: EProductLogAction.StockTransferredOut, metadata: { quantity, referenceId: request.id },
      }));
      return request.id;
    });
    return this.getAsync(id);
  }

  public async claimAsync(input: ClaimStockTransferRequestInput): Promise<StockTransferRequest> {
    const id = await this.internalRepo.manager.transaction(async (manager) => {
      const request = await manager.findOne(StockTransferRequestEntity, {
        where: { id: input.requestId, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' },
      });
      if (!request) throw new NotFoundException(`Stock request ${input.requestId} not found`);
      if (request.status !== EStockTransferRequestStatus.Accepted) throw new BadRequestException('Stock request is not ACCEPTED');
      if (!request.fulfillmentTransferId) throw new BadRequestException('Accepted stock request has no fulfillment transfer');
      const transfer = await manager.findOne(StockTransferEntity, {
        where: { id: request.fulfillmentTransferId, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' },
      });
      if (!transfer || transfer.status !== String(EStockTransferStatus.Pending)) throw new BadRequestException('Fulfillment transfer is not pending');
      await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`inventory:${input.organizationId}:${request.requestingLocationId}:${request.productId}`]);
      let inventory = await manager.findOne(InventoryEntity, {
        where: { organizationId: input.organizationId, locationId: request.requestingLocationId, productId: request.productId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!inventory) inventory = await manager.save(InventoryEntity, manager.create(InventoryEntity, {
        organizationId: input.organizationId, locationId: request.requestingLocationId, productId: request.productId,
        quantityOnHand: 0, quantityReserved: 0, reorderLevel: 0,
      }));
      const quantity = Number(request.quantityRequested);
      const before = Number(inventory.quantityOnHand);
      inventory.quantityOnHand = before + quantity;
      await manager.save(inventory);
      await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
        inventoryId: inventory.id, locationId: request.requestingLocationId, productId: request.productId,
        performedById: input.claimingUserId, referenceId: request.id, referenceType: 'stock_transfer_request',
        movementType: EMovementType.TransferIn, quantity, quantityBefore: before, quantityAfter: inventory.quantityOnHand,
      }));
      transfer.status = EStockTransferStatus.Completed;
      await manager.save(transfer);
      request.status = EStockTransferRequestStatus.Completed;
      request.claimedAt = new Date();
      await manager.save(request);
      await manager.save(ProductLogEntity, manager.create(ProductLogEntity, {
        organizationId: input.organizationId, productId: request.productId, inventoryId: inventory.id,
        locationId: request.requestingLocationId, performedById: input.claimingUserId,
        action: EProductLogAction.StockTransferredIn, metadata: { quantity, referenceId: request.id },
      }));
      return request.id;
    });
    return this.getAsync(id);
  }
}

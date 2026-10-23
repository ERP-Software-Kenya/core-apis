jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));
jest.mock('../../../../../../common', () => ({ CommandHandlerStrict: () => () => undefined, CommandBase: class CommandBase {} }));
jest.mock('../../../../../../common/push-notification', () => ({ PUSH_NOTIFICATION_SERVICE: 'PUSH_NOTIFICATION_SERVICE' }));
jest.mock('../../../../../../application/constants', () => ({ STOCK_TRANSFER_REQUEST_REPO: 'STOCK_TRANSFER_REQUEST_REPO' }));

import { EStockTransferRequestStatus } from '../../../../../../application/shared/enums/e-stock-transfer-request-status';
import { ClaimStockTransferRequestCommand, ClaimStockTransferRequestCommandHandler } from '../../../../../../application/modules/stock-transfers/commands/claim-stock-transfer-request';

describe('ClaimStockTransferRequestCommandHandler', () => {
  const logger = { info: jest.fn(), warn: jest.fn() };
  const completed = { id: 'req-1', organizationId: 'org-1', requestingLocationId: 'loc-requesting', acceptedByLocationId: 'loc-accepting', status: EStockTransferRequestStatus.Completed };
  let repo: { claimAsync: jest.Mock; findUsersForLocationAsync: jest.Mock };
  let push: { sendBatchAsync: jest.Mock };
  let handler: ClaimStockTransferRequestCommandHandler;

  beforeEach(() => {
    repo = { claimAsync: jest.fn(async () => ({ ...completed })), findUsersForLocationAsync: jest.fn(async () => ['u-accepting']) };
    push = { sendBatchAsync: jest.fn(async () => undefined) };
    handler = new ClaimStockTransferRequestCommandHandler(repo as never, push as never, logger as never);
  });

  it('delegates stock receipt and state completion to one repository transaction', async () => {
    const command = Object.assign(new ClaimStockTransferRequestCommand(), { requestId: 'req-1', organizationId: 'org-1', claimingUserId: 'u-claiming' });
    const result = await handler.execute(command);
    expect(repo.claimAsync).toHaveBeenCalledWith(command);
    expect(result.status).toBe(EStockTransferRequestStatus.Completed);
    expect(push.sendBatchAsync).toHaveBeenCalledWith([expect.objectContaining({ userId: 'u-accepting', type: 'STOCK_REQUEST_CLAIMED' })]);
  });

  it('does not notify if the atomic repository mutation fails', async () => {
    repo.claimAsync.mockRejectedValue(new Error('duplicate claim rejected'));
    await expect(handler.execute(new ClaimStockTransferRequestCommand())).rejects.toThrow('duplicate claim rejected');
    expect(push.sendBatchAsync).not.toHaveBeenCalled();
  });
});

jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));
jest.mock('../../../../../../common', () => ({ CommandHandlerStrict: () => () => undefined, CommandBase: class CommandBase {} }));
jest.mock('../../../../../../common/push-notification', () => ({ PUSH_NOTIFICATION_SERVICE: 'PUSH_NOTIFICATION_SERVICE' }));
jest.mock('../../../../../../application/constants', () => ({ STOCK_TRANSFER_REQUEST_REPO: 'STOCK_TRANSFER_REQUEST_REPO' }));

import { EStockTransferRequestStatus } from '../../../../../../application/shared/enums/e-stock-transfer-request-status';
import { AcceptStockTransferRequestCommand, AcceptStockTransferRequestCommandHandler } from '../../../../../../application/modules/stock-transfers/commands/accept-stock-transfer-request';

describe('AcceptStockTransferRequestCommandHandler', () => {
  const logger = { info: jest.fn(), warn: jest.fn() };
  const accepted = { id: 'req-1', organizationId: 'org-1', requestingLocationId: 'loc-requesting', acceptedByLocationId: 'loc-accepting', status: EStockTransferRequestStatus.Accepted };
  let repo: { acceptAsync: jest.Mock; findUsersForLocationAsync: jest.Mock };
  let push: { sendBatchAsync: jest.Mock };
  let handler: AcceptStockTransferRequestCommandHandler;

  beforeEach(() => {
    repo = { acceptAsync: jest.fn(async () => ({ ...accepted })), findUsersForLocationAsync: jest.fn(async () => ['u-requesting']) };
    push = { sendBatchAsync: jest.fn(async () => undefined) };
    handler = new AcceptStockTransferRequestCommandHandler(repo as never, push as never, logger as never);
  });

  it('delegates the atomic mutation to the repository', async () => {
    const command = Object.assign(new AcceptStockTransferRequestCommand(), { requestId: 'req-1', organizationId: 'org-1', acceptingLocationId: 'loc-accepting', acceptingUserId: 'u-accepting' });
    const result = await handler.execute(command);
    expect(repo.acceptAsync).toHaveBeenCalledWith(command);
    expect(result.status).toBe(EStockTransferRequestStatus.Accepted);
    expect(push.sendBatchAsync).toHaveBeenCalledWith([expect.objectContaining({ userId: 'u-requesting', type: 'STOCK_REQUEST_ACCEPTED' })]);
  });

  it('does not notify if the atomic repository mutation fails', async () => {
    repo.acceptAsync.mockRejectedValue(new Error('concurrent accept rejected'));
    await expect(handler.execute(new AcceptStockTransferRequestCommand())).rejects.toThrow('concurrent accept rejected');
    expect(push.sendBatchAsync).not.toHaveBeenCalled();
  });
});

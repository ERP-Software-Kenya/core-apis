import { IBlockAddress } from "./i-block-address";
import { IMetadata } from "./i-metadata";

export interface IRecordHistory<T> {
  blockAddress: IBlockAddress;
  hash: unknown; // don't know the type see query result sample: https://docs.aws.amazon.com/qldb/latest/developerguide/working.history.html // example: hash:{{B2wYwrHKOWsmIBmxUgPRrTx9lv36tMlod2xVvWNiTbo=}}
  data: T;
  metadata: IMetadata;
}

import { IBaseRepo } from "src/common";
import { Maintenance } from "../domain";

export interface IMaintenanceRepo extends IBaseRepo<Maintenance, string> {}

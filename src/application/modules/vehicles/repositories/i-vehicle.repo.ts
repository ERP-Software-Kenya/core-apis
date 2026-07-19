import { IBaseRepo } from "src/common";
import { Vehicle } from "../domain";

export interface IVehicleRepo extends IBaseRepo<Vehicle, string> {}

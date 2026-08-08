import { IBaseRepo } from "src/common";
import { Trip } from "../domain";


export interface ITripRepo extends IBaseRepo<Trip, string> {}

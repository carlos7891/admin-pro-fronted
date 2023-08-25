import { Hospital } from "../models/hospitals.model";


export interface HospitalsResponse {
  msg:string;
  total:number;
  hospitals: Hospital[];
}

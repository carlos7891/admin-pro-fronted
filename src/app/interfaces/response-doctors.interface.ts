import { Doctor } from "../models/doctor.model";

export interface DoctorsResponse {
  msg:string;
  total:number;
  doctors: Doctor[];
}

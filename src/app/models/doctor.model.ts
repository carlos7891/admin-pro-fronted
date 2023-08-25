import { Hospital } from "./hospitals.model";

interface _DoctorUser {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {

  constructor(
    public _id: string,
    public name: string,
    public img?: string,
    public user?: _DoctorUser,
    public hospital?: Hospital,
  ){ }

}

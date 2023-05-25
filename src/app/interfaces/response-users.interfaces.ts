import { User } from "../models/user.model";

export interface UsersResponse {
  msg:string;
  total:number;
  users: User[];
}

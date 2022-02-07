import { UserI } from "src/app/model/user.interface";
export interface LoginResponseI {
  jwtToken: string;
  user: UserI;
}

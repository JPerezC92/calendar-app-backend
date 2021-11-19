import { Credentials } from ".";

export interface User extends Credentials {
  _id: number;
  name: string;
}

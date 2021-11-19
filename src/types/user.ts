import { Credentials } from ".";

export interface User extends Credentials {
  _id: string;
  name: string;
}

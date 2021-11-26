import { User } from ".";

export type NewUser = Omit<User, "id">;

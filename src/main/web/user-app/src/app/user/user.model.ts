import {Address} from "./address.model";

export class User {
  constructor(
    public userName: string,
    public id?: any,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public addresses?:Address[]
  ) {
  }
}

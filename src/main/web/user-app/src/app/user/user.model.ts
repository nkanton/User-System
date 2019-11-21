import {Address} from "../address/address.model";

export class User {
  public id: any;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public phoneNumber: any;
  public addresses: Array<Address>;

  constructor(obj) {
    this.id = obj && obj.id || null;
    this.userName = obj && obj.userName || null;
    this.firstName = obj && obj.firstName || null;
    this.lastName = obj && obj.lastName || null;
    this.password = obj && obj.password || null;
    this.email = obj && obj.email || null;
    this.phoneNumber = obj && obj.phoneNumber || null;
  }
}

export class Address {
  public id?: Number;
  public type?: string;
  public address?: string;
  public city?: string;
  public postalCode?: number;

  constructor(obj) {
    this.id = obj && obj.id || null;
    this.type = obj && obj.type || null;
    this.address = obj && obj.address || null;
    this.city = obj && obj.city || null;
    this.postalCode = obj && obj.postalCode || null;
  }
}

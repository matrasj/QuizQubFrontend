export class UserPayloadResponseModel {
  constructor(public id : number,
  public firstName : string,
  public lastName : string,
  public username : string,
  public email : string,
  public enabled : boolean,
  public createdAt : string,
  public lastUpdated : string,
  public roleName : string) {
  }
}

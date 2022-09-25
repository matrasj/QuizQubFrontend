export class SessionPayloadResponseModel {
  constructor(public id : number,
  public createdAt : string,
  public userId : number,
  public userFirstName : string,
  public userLastName : string,
  public userUsername : string,
  public subjectName : string,
  public minutesMaxDuration : number,
  public durationTime : string,
  public finished : boolean,
  public percentageScore : string) {
  }
}

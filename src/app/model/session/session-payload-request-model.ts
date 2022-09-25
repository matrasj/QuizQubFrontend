export class SessionPayloadRequestModel {
  constructor(public userId : number,
              public subjectName : string,
              public minutesMaxDuration : number,
              public durationTime : string,
              public finished : boolean,
              public percentageScore : string) {
  }
}

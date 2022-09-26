import {OptionPayloadResponseModel} from "../option/option-payload-response-model";

export class QuestionPayloadModel {
  constructor(public id : number,
              public content : string,
              public subjectName : string,
              public correctAnswer : string,
              public options : OptionPayloadResponseModel[]) {
  }

}

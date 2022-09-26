import {OptionPayloadRequestModel} from "../option/option-payload-request-model";

export class QuestionPayloadRequestModel {
  constructor(public subjectName : string,
              public content : string,
              public correctOption : string,
              public options : OptionPayloadRequestModel[]) {
  }
}

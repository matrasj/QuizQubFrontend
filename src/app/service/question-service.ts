import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";
import {AppModule} from "../app.module";
import {QuestionPayloadRequestModel} from "../model/question/question-payload-request-model";
import {QuestionPayloadResponseModel} from "../model/question/question-payload-response-model";
import {QuestionPayloadModel} from "../model/question/question-payload-model";

@Injectable({
  providedIn : 'root'
})
export class QuestionService {
  constructor(private httpClient : HttpClient) {
  }

  public createQuestion(questionPayloadRequest : QuestionPayloadRequestModel) : Observable<string> {
    return this.httpClient.post(`${AppComponent.API_URL}/api/v1/questions`, questionPayloadRequest, {
      responseType : 'text'
    });
  }

  public updateQuestion(questionPayloadRequest : QuestionPayloadRequestModel, questionId : number) : Observable<string> {
    return this.httpClient.post(`${AppComponent.API_URL}/api/v1/questions/update/${questionId}`, questionPayloadRequest, {
      responseType : 'text'
    });
  }

  public getQuestionsWithPagination(pageNumber : number, pageSize : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${AppComponent.API_URL}/api/v1/questions/pagination?pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public getQuestionsDataById(questionId : number) : Observable<QuestionPayloadModel> {
    return this.httpClient.get<QuestionPayloadModel>(`${AppComponent.API_URL}/api/v1/questions/${questionId}`);
  }

  public deleteQuestionById(questionId : number) : Observable<string> {
    return this.httpClient.delete(`${AppComponent.API_URL}/api/v1/questions/delete/${questionId}`, {
      responseType : 'text'
    });
  }

  getQuestionForSession(subjectName: string) : Observable<QuestionPayloadModel[]> {
    return this.httpClient.get<QuestionPayloadModel[]>(`${AppComponent.API_URL}/api/v1/questions/findBySubjectName?subjectName=${subjectName}`)
  }

  getQuestionsBySubjectNameWithPagination(subjectName: string, pageNumber: number, pageSize: number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${AppComponent.API_URL}/api/v1/questions/pagination/findBySubjectName?subjectName=${subjectName}&pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  // for downloading
  getAllQuestionsBySubjectName(subjectName : string) : Observable<QuestionPayloadModel[]> {
    console.log(subjectName)
    return this.httpClient.get<QuestionPayloadModel[]>(`${AppComponent.API_URL}/api/v1/questions/findBySubjectName?subjectName=${subjectName}`);
  }

  getAllQuestions() : Observable<QuestionPayloadModel[]> {
    return this.httpClient.get<QuestionPayloadModel[]>(`${AppComponent.API_URL}/api/v1/questions`);
  }
}

export interface PageApiResponse {
  content : QuestionPayloadModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number,
}

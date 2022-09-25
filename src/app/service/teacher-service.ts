import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionPayloadResponseModel} from "../model/session/session-payload-response-model";
import {PageApiResponse} from "./question-service";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn : 'root'
})
export class TeacherService {
  constructor(private httpClient : HttpClient) {
  }

  public getSessionsForTeacherDashboard(pageNumber : number, pageSize : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${AppComponent.API_URL}/api/v1/sessions/pagination/students?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}

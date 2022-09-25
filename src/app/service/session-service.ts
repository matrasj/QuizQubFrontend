import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";
import {SessionPayloadRequestModel} from "../model/session/session-payload-request-model";
import {SessionPayloadResponseModel} from "../model/session/session-payload-response-model";

@Injectable({
  providedIn : 'root'
})
export class SessionService {
  constructor(private httpClient : HttpClient) {
  }

  saveSession(sessionRequest: SessionPayloadRequestModel) : Observable<string> {
    return this.httpClient.post(`${AppComponent.API_URL}/api/v1/sessions`, sessionRequest, {
      responseType : 'text'
    });
  }

  getLatestSessionByUserId(userId : number) : Observable<SessionPayloadResponseModel> {
    return this.httpClient.get<SessionPayloadResponseModel>(`${AppComponent.API_URL}/api/v1/sessions/latest/student/${userId}`)
  }
 }

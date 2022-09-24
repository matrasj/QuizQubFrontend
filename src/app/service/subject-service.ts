import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectPayloadResponseModel} from "../model/subject-payload-response-model";
import {environment} from "../../environments/environment";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn : 'root'
})
export class SubjectService {

  constructor(private httpClient : HttpClient) {
  }

  public getAllSubjects() : Observable<SubjectPayloadResponseModel[]> {
    return this.httpClient.get<SubjectPayloadResponseModel[]>(`${AppComponent.API_URL}/api/v1/subjects`);
  }


}

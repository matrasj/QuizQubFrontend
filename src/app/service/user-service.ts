import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageApiResponse} from "./question-service";
import {AppComponent} from "../app.component";
import {UserPayloadRequestModel} from "../model/user-payload-request-model";
import {UserPayloadResponseModel} from "../model/user-payload-response-model";
import {A} from "@angular/cdk/keycodes";

@Injectable({
  providedIn : 'root'
})
export class UserService {
  constructor(private httpClient : HttpClient) {
  }

  public getUsersWithPagination(pageNumber : number, pageSize : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${AppComponent.API_URL}/api/v1/users/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public createUser(userPayloadRequestModel: UserPayloadRequestModel) : Observable<string>{
    return this.httpClient.post(`${AppComponent.API_URL}/api/v1/users`, userPayloadRequestModel, {
      responseType : 'text'
    });
  }

  public updateUser(userPayloadRequestModel: UserPayloadRequestModel, id : number) : Observable<string> {
    return this.httpClient.put(`${AppComponent.API_URL}/api/v1/users/update/${id}`, userPayloadRequestModel,
      {
        responseType : 'text'
      });
  }

  public getUserDataById(userId : number) : Observable<UserPayloadResponseModel> {
    return this.httpClient.get<UserPayloadResponseModel>(`${AppComponent.API_URL}/api/v1/users/${userId}`);
  }


  deleteUserById(userId: number) : Observable<string>{
    return this.httpClient.delete(`${AppComponent.API_URL}/api/v1/users/delete/${userId}`,
      {
        responseType : 'text'
      });
  }

  getAttemptsByUserId(userId : number) : Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(`${AppComponent.API_URL}/api/v1/users/findAttemptsByUserId?userId=${userId}`)
  }
}

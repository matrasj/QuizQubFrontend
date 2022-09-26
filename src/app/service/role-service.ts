import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";
import {RolePayloadResponseModel} from "../model/role/role-payload-response-model";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn : 'root'
})
export class RoleService {
  constructor(private httpClient : HttpClient) {
  }

  getRoles() : Observable<RolePayloadResponseModel[]> {
    return this.httpClient.get<RolePayloadResponseModel[]>(`${AppComponent.API_URL}/api/v1/roles`);
  }
}

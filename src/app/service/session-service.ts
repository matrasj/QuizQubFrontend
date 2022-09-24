import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn : 'root'
})
export class SessionService {
  constructor(private httpClient : HttpClient) {
  }
}

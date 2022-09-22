import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthGuard} from "./auth-guard";
import {AuthService} from "../service/auth-service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private authService : AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    return this.authService.isLoggedIn();
  }


}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {
  constructor(private router : Router,
              private authService : AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getToken() !== null) {
      const roles : string[] = route.data['roles'] as string[];

      if (roles.find((role) => role === this.authService.getCurrentUser()?.roleName)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.authService.logout();
        return false;
      }
    }
    this.router.navigate(['/login']);
    this.authService.logout();
    return false;
  }

}

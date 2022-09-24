import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth-service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService,
              private router : Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("api/v1/auth")) {
      return next.handle(req.clone());
    }

    const jwtToken : string | null = this.authService.getToken();

    const requestWithBearerJwtToken = this.addToken(req, jwtToken);
    return next.handle(requestWithBearerJwtToken).pipe(
      catchError(
        (err : HttpErrorResponse | any) => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login'])
          }

          return throwError("Something gone wrong");
        }
      )
    )

  }

  private addToken(request : HttpRequest<any>, jwtToken : string | null) : HttpRequest<any> {
     return request.clone({
      setHeaders : {
        Authorization : "Bearer " + jwtToken
      }
    });
  }


}

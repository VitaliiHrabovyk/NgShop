import { HttpContext, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth:AuthService,
        private router: Router
        ){} 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenicated()){
            req = req.clone({
                setParams: {
                    auth: this.auth.token || "none"
                }
            })
            
        }

        return next.handle(req)
        .pipe(
            catchError(error => { 
                if (error.status === 401 ){
                    this.auth.logOut()
                    this.router.navigate(["/admin", "login"])
                }
                return throwError(error)
            })
            )


    }



}
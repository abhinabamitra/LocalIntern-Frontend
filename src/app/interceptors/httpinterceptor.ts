import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    addHeaders(token: string | null) {
        return {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            credentials: 'include',
        };
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        var authToken = localStorage.getItem('token');
        const authReq = req.clone({
            headers: new HttpHeaders(this.addHeaders(authToken)),
            withCredentials: true,
        });
        return next.handle(authReq);
    }
}
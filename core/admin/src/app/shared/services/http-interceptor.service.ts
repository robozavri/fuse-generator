import { throwError as observableThrowError, Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: any = req.clone({ setHeaders: { token: this.authService.getToken() } });
    
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status >= 200 && err.status < 300) {
        return of(new HttpResponse({
          body: null,
          headers: err.headers,
          status: err.status,
          statusText: err.statusText,
          url: err.url
        }));
      } else if (err.status === 401) {
        this.router.navigate(['/admin/login']);
        return observableThrowError(err);
      } else {
        return observableThrowError(err);
      }
    }));
  }
}
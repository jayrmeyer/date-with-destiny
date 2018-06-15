import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'X-API-Key': environment.bungie.apiKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const newReq = request.clone({ headers: headers });
    console.log('bungie request');
    console.log(newReq);
    return next.handle(newReq).pipe(
      tap(
        response => {
          console.log('bungie response');
          console.log(response);
        },
        error => console.error(error)
      )
    );
  }
}

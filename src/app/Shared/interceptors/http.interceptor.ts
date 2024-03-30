import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log the intercepted request for debugging purposes
    console.log('Intercepted Request:', request);

    // Clone the request and append the token to the headers
    const newReq = request.clone({
      setHeaders: {
        'token': `${localStorage.getItem('eToken')}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(newReq);
  }
}

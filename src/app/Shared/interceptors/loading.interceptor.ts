import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show the spinner when a request is initiated
    this.spinner.show();

    // Continue handling the request and hide the spinner when it completes
    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}

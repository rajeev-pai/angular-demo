import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class HttpDelayInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return of(null)
      .pipe(mergeMap(() => {
        return next.handle(req);
      }))
      .pipe(materialize())
      .pipe(delay(700))
      .pipe(dematerialize());
  }
}

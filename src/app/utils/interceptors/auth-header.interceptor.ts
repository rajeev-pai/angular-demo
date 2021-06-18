import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LOGIN, SIGNUP } from '../../helpers/apis';

const EXEMPTIONS = [
  LOGIN,
  SIGNUP
];

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, headers } = req;

    if (this.shouldIntercept(url)) {
      req = req.clone({
        headers: this.getHeadersToAdd(headers),
      });
    }

    return next.handle(req);
  }

  /**
   * Private method to check if this interceptor should modify
   * the request
   * @param url 
   * @returns {boolean}
   */
  private shouldIntercept(url: string): boolean {
    for (const exemption of EXEMPTIONS) {
      if (url.endsWith(exemption)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Private method to get the headers to add to the request.
   * @param currentHeaders 
   * @returns {HttpHeaders}
   */
  private getHeadersToAdd(currentHeaders: HttpHeaders): HttpHeaders {
    // Tuple array containing all the headers to be added to the request.
    const headersToAdd: [string, string][] = [];
    const authKey = this.authService.getAuthToken();

    if (authKey) {
      headersToAdd.push(['Authorization', `Bearer ${authKey}`]);
    }

    // Ignore if the request already has the 'Content-Type' header.
    if (!currentHeaders.has('Content-Type')) {
      headersToAdd.push(['Content-Type', 'application/json']);
    }

    let newHeaders = currentHeaders;

    for (const headerToAdd of headersToAdd) {
      newHeaders = newHeaders.append(...headerToAdd);
    }

    return newHeaders;
  }
}
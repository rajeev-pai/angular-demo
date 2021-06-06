import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginFormData, SignUpFormData } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginFormData) {
    return this.http.post('/api/accounts/login', { ...data });
  }

  signUp(data: SignUpFormData) {
    return this.http.post('/api/accounts/create', { ...data });
  }

  checkUsernameAvailability(username: string) {
    const params = new HttpParams().append('username', username);

    return (
      this.http.get(
        '/api/accounts/username-availability',
        { params },
      ) as Observable<{ available: boolean; }>
    );
  }
}
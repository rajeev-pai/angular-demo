import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';

import { LoginFormData, SignUpFormData } from './auth.types';

interface LoginFormData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginFormData) {
    return this.http.post('/api/accounts/login', data);
  }

  signUp(data: SignUpFormData) {
    return this.http.post('/api/accounts/create', data);
  }
}
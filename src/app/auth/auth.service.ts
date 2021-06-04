import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
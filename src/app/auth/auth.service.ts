import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private value = null;

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  setValue(newVal: any) {
    this.value = newVal;
  }

  getValue() {
    return this.value;
  }
}
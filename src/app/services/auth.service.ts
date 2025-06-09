// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }

  storeUser(user: any): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }
}

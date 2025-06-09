import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {
  }
  register(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/register', user);
  }

}

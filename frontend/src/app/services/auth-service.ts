import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
  return this.http.post<any>(`${this.usersUrl}/login`, credentials).pipe(
    tap(response => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response) {
        localStorage.setItem('user', JSON.stringify({
          id: Number(response.id), 
          name: response.name,
          email: response.email
        }));
      }
    })
  );
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
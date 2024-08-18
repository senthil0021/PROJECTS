import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Ensure this URL is correct in environment.ts
  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
 

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  logout() {
    this.clearToken();
    this.authStatus.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.authStatus.next(true);
  }

  private clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  private productsApiUrl = 'https://fakestoreapi.com/products';
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsApiUrl);
  }

  resetPassword(token: string, data: { password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { ...data, token });
  }
  
  }


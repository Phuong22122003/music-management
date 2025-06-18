import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  logout(): void {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

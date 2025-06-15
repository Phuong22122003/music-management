import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../../core/models/model';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone:false
})
export class LogInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login({ email, password }).subscribe({
      next: (res:LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/tracks']);
      },
      error: () => {
        this.errorMessage = 'Sai tài khoản hoặc mật khẩu!';
      }
    });
  }
}

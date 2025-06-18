import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './core/services/toast.service';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TrackUpload';
  subscriptionSuccess!: Subscription;
  subscriptionError!: Subscription;

  constructor(
    private toastService: ToastService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully', 'Success');
  }

  ngOnInit(): void {
    this.subscriptionError = this.toastService.toastError.subscribe(
      (toastInfo) => {
        this.toastr.error(toastInfo.message, toastInfo.summary);
      }
    );
    this.subscriptionSuccess = this.toastService.toastSuccess.subscribe(
      (toastInfo) => {
        this.toastr.success(toastInfo.message, toastInfo.summary);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionError) {
      this.subscriptionError.unsubscribe();
    }
    if (this.subscriptionSuccess) {
      this.subscriptionSuccess.unsubscribe();
    }
  }
}

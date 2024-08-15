import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).pipe(
        catchError(error => {
          console.error('Failed to send password reset link', error);
          let errorMessage = 'Failed to send password reset link. Please try again later.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.snackBar.open('Password reset link sent', 'Close', { duration: 3000 });
          // Navigate to reset password page
          // You can modify this part if the actual URL requires parameters
          this.router.navigate(['/reset-password']);
        }
      });
    }
  }
}

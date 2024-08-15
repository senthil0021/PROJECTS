import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

    resetPasswordForm: FormGroup;
    token: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.resetPasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    ngOnInit() {
      // Get the token from the query parameters
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
        if (!this.token) {
          this.snackBar.open('Invalid or expired token', 'Close', { duration: 3000 });
          this.router.navigate(['/forgot-password']);
        }
      });
    }
  
    onResetPasswordSubmit() {
      if (this.resetPasswordForm.valid && this.token) {
        const password = this.resetPasswordForm.value.password;
        this.authService.resetPassword(this.token, { password }).subscribe(
          () => {
            this.snackBar.open('Password reset successful', 'Close', { duration: 3000 });
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Failed to reset password', error);
            let errorMessage = 'Failed to reset password. Please try again later.';
            if (error.error && error.error.error) {
              errorMessage = error.error.error;
            }
            this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          }
        );
      }
    }
  }
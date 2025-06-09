import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          const user = res.user;
          this.authService.storeUser(user);

          // ✅ Redirect by role
          switch (user.role?.toUpperCase()) {
            case 'ADMIN':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'DRIVER':
              this.router.navigate(['/tracks']);
              break;
            case 'PASSENGER':
              this.router.navigate(['/passenger-dashboard']); // Add this route later
              break;
            default:
              this.router.navigate(['/']);
          }
        } else {
          this.errorMessage = res.message || 'Login failed.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Login failed. Check your credentials.';
        console.error(err);
      }
    });
  }
}

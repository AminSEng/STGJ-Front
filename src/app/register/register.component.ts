import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      role: ['PASSENGER'],
      address: [''],
      addressRecuperation: [''],
      disponibilite: [false]
    });
  }


  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get phone() { return this.registerForm.get('phone'); }
  get role() { return this.registerForm.get('role'); }
  get address() { return this.registerForm.get('address'); }
  get addressRecuperation() { return this.registerForm.get('addressRecuperation'); }
  get disponibilite() { return this.registerForm.get('disponibilite'); }


  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    const newUser = this.registerForm.value;

    this.authService.register(newUser).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.successMessage = 'Registration successful. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.errorMessage = res.message || 'Registration failed.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Something went wrong.';
      }
    });
  }
}

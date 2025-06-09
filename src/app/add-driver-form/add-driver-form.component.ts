import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-add-driver-form',
  standalone: false,
  templateUrl: './add-driver-form.component.html',
  styleUrls: ['./add-driver-form.component.css']
})
export class AddDriverFormComponent implements OnInit {
  driverForm!: FormGroup;
  submissionSuccess: boolean = false;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [null],
      disponibilite: [false],
      role: ['driver']
    });
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      const newDriver: Product = this.driverForm.value;

      this.productService.addProduct(newDriver).subscribe({
        next: (createdDriver) => {
          console.log('Driver added:', createdDriver);
          this.submissionSuccess = true;
          this.submissionError = null;
          this.driverForm.reset();
        },
        error: (err) => {
          console.error('Failed to add driver:', err);
          this.submissionError = 'Failed to add driver. Please try again.';
          this.submissionSuccess = false;
        }
      });
    } else {
      this.submissionError = 'Please fill in all required fields.';
    }
  }
}

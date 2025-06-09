import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-add-track-form',
  standalone: false,
  templateUrl: './add-track-form.component.html',
  styleUrls: ['./add-track-form.component.css']
})
export class AddTrackFormComponent implements OnInit {
  trackForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.trackForm = this.fb.group({
      nom: ['', Validators.required],
      departLatitude: ['', Validators.required],
      departLongitude: ['', Validators.required],
      arriveeLatitude: ['', Validators.required],
      arriveeLongitude: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.trackForm.invalid) return;

    this.productService.addTrajet(this.trackForm.value).subscribe({
      next: () => {
        this.message = 'Track added successfully!';
        this.error = null;
        this.trackForm.reset();
      },
      error: (err) => {
        this.error = err.error?.message || 'An error occurred';
        this.message = null;
      }
    });
  }
}

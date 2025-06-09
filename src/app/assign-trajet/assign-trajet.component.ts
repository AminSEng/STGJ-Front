import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assign-trajet',
  standalone: false,
  templateUrl: './assign-trajet.component.html',
  styleUrls: ['./assign-trajet.component.css']
})
export class AssignTrajetComponent implements OnInit {
  assignForm!: FormGroup;
  drivers: Product[] = [];
  trajets: any[] = [];
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      driverId: [null, Validators.required],
      trajetId: [null, Validators.required]
    });

    this.loadDrivers();
    this.loadTrajets();
  }

  loadDrivers(): void {
    this.productService.getAllProducts().subscribe({
      next: (users) => {
        this.drivers = users.filter(u => u.role === 'DRIVER');
      },
      error: (err) => console.error('Failed to load drivers', err)
    });
  }

  loadTrajets(): void {
    this.http.get<any[]>('http://localhost:8080/api/admin/trajets').subscribe({
      next: (data) => this.trajets = data,
      error: (err) => console.error('Failed to load trajets', err)
    });
  }

  onSubmit(): void {
    if (this.assignForm.invalid) return;

    const { driverId, trajetId } = this.assignForm.value;

    this.productService.assignTrajetToDriver(driverId, trajetId).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = null;
      },
      error: (err) => {
        this.error = err.error?.message || 'An error occurred';
        this.message = null;
      }
    });
  }
}

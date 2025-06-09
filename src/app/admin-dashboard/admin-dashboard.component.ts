import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userCounts: any = {};
  loading = true;
  errorMessage: string | null = null;
  driverAssignments: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadDriverAssignments();
  }

  loadStats(): void {
    this.productService.getUserCounts().subscribe({
      next: (data) => {
        this.userCounts = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load analytics.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadDriverAssignments(): void {
    this.productService.getDriverAssignments().subscribe({
      next: (data) => {
        this.driverAssignments = data;
        console.log('Assignments loaded:', data);
      },
      error: (err) => {
        console.error('Error loading driver assignments:', err);
        this.errorMessage = 'Failed to load driver assignments.';
      }
    });
  }
}

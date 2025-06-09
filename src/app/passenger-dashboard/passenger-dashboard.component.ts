import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passenger-dashboard',
  standalone: false,
  templateUrl: './passenger-dashboard.component.html',
  styleUrls: ['./passenger-dashboard.component.css']
})
export class PassengerDashboardComponent implements OnInit {
  trajets: any[] = [];
  userId: number = 0; // Set this properly from login/session
  selectedTrajetId: number | null = null;
  message: string | null = null;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user)

      this.userId = user.userId;
    }
    this.loadTrajets();
  }

  loadTrajets(): void {
    this.productService.getAllTrajets().subscribe({
      next: (data) => this.trajets = data,
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load trajets.';
      }
    });
  }

  chooseTrajet(trajetId: number): void {

    console.log(trajetId)
    console.log(this.userId)
    if (!this.userId) return;

    this.productService.chooseTrajet(this.userId, trajetId).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = null;
      },
      error: (err) => {
        this.message = null;
        this.error = err?.error?.message || 'Failed to choose trajet.';
      }
    });
  }
}

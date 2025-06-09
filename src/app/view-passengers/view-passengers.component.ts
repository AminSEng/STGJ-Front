import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-passengers',
  standalone: false,
  templateUrl: './view-passengers.component.html',
  styleUrls: ['./view-passengers.component.css']
})
export class ViewPassengersComponent implements OnInit {
  passengers: any[] = [];
  passengerTrajets: { [userId: number]: string } = {};
  error: string | null = null;
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllPassengers().subscribe({
      next: (data) => {
        this.passengers = data;
        this.loading = false;

        // For each passenger, load their assigned trajet
        for (let passenger of this.passengers) {
          this.productService.getAssignedTrajets(passenger.userId).subscribe({
            next: (trajetData) => {
              // Fix: Check if trajetData is an array and get the first trajet's nom
              if (Array.isArray(trajetData) && trajetData.length > 0) {
                // If user has multiple trajets, you might want to show all or just the first one
                const trajetNames = trajetData.map(item => item.trajet.nom).join(', ');
                this.passengerTrajets[passenger.userId] = trajetNames;
              } else {
                this.passengerTrajets[passenger.userId] = 'No trajet assigned';
              }
              console.log(trajetData);
            },
            error: (err) => {
              this.passengerTrajets[passenger.userId] = 'Error loading trajet';
              console.error(`Error loading trajet for userId ${passenger.userId}`, err);
            }
          });
        }
      },
      error: (err) => {
        this.error = 'Failed to load passengers.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadTrajetsUser(userId: number) {
    this.productService.getAssignedTrajets(userId).subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }
}

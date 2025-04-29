import { Component, OnInit } from '@angular/core';
import {TrackService} from '../services/track.service';
import {ProductService} from '../services/product.service';
import {Track} from '../model/track.model';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  tracks! : Array<Track> ;
  errorMessage! : string;
  constructor(private trackService : TrackService, private productService : ProductService  ) {
    this.tracks = [];
    this.errorMessage = '';
  }
  ngOnInit(): void {
    this.handleGetAllTracks();
  }
  handleGetAllTracks() {
    this.trackService.getAllTracks().subscribe({
      next: (data) => {
        this.tracks = data;
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
    }
  handleDeleteTrack(track: Track) {
    if (confirm("Are you sure you want to delete this track?")) {
      if(!track.trajetId) return;
      this.trackService.deleteTrack(track.trajetId).subscribe({
        next: (data) => {
          this.handleGetAllTracks();
          console.log(data);
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
      }
    }
  handleBackHome() {
    this.productService.backHome().subscribe({
      next: (data) => {
        window.location.href = '/';
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  handleAddTrack() {
    let nom = prompt("Enter track name");
    if (!nom) {
      alert("Please enter all fields");
      return;
    }

    let track: Track = {
      nom: nom,
      // Add any other required fields based on your Track model
    };

    console.log('Sending track:', track);

    this.trackService.addTrack(track).subscribe({
      next: (data) => {
        console.log('Track added successfully:', data);
        this.handleGetAllTracks(); // Refresh the tracks list
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error adding track:', error);
        alert('Failed to add track: ' + error.message);
      }
    });
  }
}

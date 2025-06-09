import { Injectable } from '@angular/core';
import {Track} from '../model/track.model';
import {catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private tracks! : Array<Track> ;

  constructor(private http : HttpClient) {
    this.tracks = [
    ];
  }
  public getAllTracks() : Observable<Track[]>  {
    return this.http.get<any>('http://localhost:8080/api/admin/trajets')
      .pipe(
        map(response => {
          // Assuming the API returns an object with a track property
          return response.trajets || response;
        }),
        catchError(error => {
          console.error('Error fetching tracks:', error);
          return throwError(() => error);
        })
      );
  }
  public deleteTrack(id :number): Observable<boolean> {
    return this.http.delete<any>(`http://localhost:8080/api/admin/trajets/${id}`)
      .pipe(
        map(response => {
          console.log('Track deleted:', response);
          // Assuming the API returns a success message or status
          return response.success || true;
        }),
        catchError(error => {
          console.error('Error deleting track:', error);
          return throwError(() => error);
        })
      );
  }
  public addTrack(track : Track): Observable<Track> {
    return this.http.post<any>('http://localhost:8080/api/admin/trajets', track)
      .pipe(
        map(response => {
          console.log('Track created:', response);
          // Assuming the API returns the created user object
          return response.track || response;
        }),
        catchError(error => {
          console.error('Error creating track:', error);
          return throwError(() => error);
        })
      );
  }


  // public assignTrackToProduct(track: Track, productId: number): Observable<boolean> {
  //   let index = this.tracks.findIndex(t => t.id == track.id);
  //   if (index == -1) {
  //     return throwError(() => new Error('Track not found'));
  //   }
  //   this.tracks[index].id = productId;
  //   return of(true);
  // }

}

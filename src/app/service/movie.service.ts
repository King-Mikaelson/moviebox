import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public isLoading: boolean = false;
  public isPending: boolean = false;

  private apiBaseUrl = 'https://api.themoviedb.org/3';

  private httpOptions = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmM5ZGM3M2RhNzVhODJiNTViZGU1N2U1YTRjN2MwNCIsInN1YiI6IjYzOGM0Y2JkNDIwMjI4MDA3YjAyOTQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0VZ-2dNG9tL8Wn2-WVGoU2QZvq6kmPmWOzRUJy1Mcc8",
    },
  };


  getMovieDetails(id: any): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/movie/${id}?language=en-US`, this.httpOptions)
      .pipe(
        catchError(this.handleError('getMovieDetails', {}))
      );
  }

  getMovieCredits(id: any): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/movie/${id}/credits?language=en-US`, this.httpOptions)
      .pipe(
        catchError(this.handleError('getMovieCredits', {}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

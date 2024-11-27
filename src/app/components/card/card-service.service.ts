import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface Movie  {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/top_rated'
  constructor(private http: HttpClient) {}


  public isLoading: boolean = false;
  public isPending: boolean = false;


  getMovies(): Observable<Movie[]> {
    this.isLoading = true;

    const options = {
      method: "GET",
      params: {
        language: 'en-US',
        page: '1'
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmM5ZGM3M2RhNzVhODJiNTViZGU1N2U1YTRjN2MwNCIsInN1YiI6IjYzOGM0Y2JkNDIwMjI4MDA3YjAyOTQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0VZ-2dNG9tL8Wn2-WVGoU2QZvq6kmPmWOzRUJy1Mcc8",
      },
    };

    return this.http.get<{ results: Movie[] }>(this.apiUrl,options).pipe(
      map((response) => { this.isLoading = false; return response.results}),
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.isLoading = false;
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); // Return a safe result in case of error
    };
  }

}

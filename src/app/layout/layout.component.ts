import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-layout',
  imports: [DashboardComponent,MovieDetailsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, public movieService: MovieService) {}
  isPending = true;
  movieData: any = {};
  movieCredits: any = {};
  error: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') as string;
      if(id !== null){
        this.fetchMovieDetails(id)
      }
    });
  }

  fetchMovieDetails(id: string) {
    this.isPending = true;
    
    forkJoin({
      details: this.movieService.getMovieDetails(id),
      credits: this.movieService.getMovieCredits(id)
    }).subscribe({
      next: (results) => {
        this.movieData = results.details;
        console.log(this.movieData)
        this.movieCredits = results.credits;
        console.log(this.movieCredits)
        this.isPending = false;
        this.error = null;
      },
      error: (err) => {
        console.error(err);
        this.isPending = false;
        this.error = err.message;
      }
    });
  }
}

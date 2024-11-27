import { Component, Input, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';
import { CardService } from '../../service/card.service';

interface Movie {
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

@Component({
  selector: 'app-card',
  imports: [CommonModule, CardDetailsComponent, LoadingIndicatorComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  isPending: boolean = false;
  loading: boolean = false;

  @Input() data: Movie[] = [];
  @Input() filteredData: Movie[] = [];

  getMovies(): Movie[] {
    return this.filteredData.length > 0 ? this.filteredData : this.data;
  }


  movies: Movie[] = [];
  error: string | null = null;

  constructor(public cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getMovies().subscribe({
      next: (response) => {
        console.log(this.movies)
        this.movies = response;
        console.log(this.movies)
      },
      error: (err) => {
        this.error = 'Error fetching movies';
        console.error(err);
      },
    });
  }

}

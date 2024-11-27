import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface CrewMember {
  department?: string;
  job?: string;
  name: string;
}

interface CastMember {
  known_for_department?: string;
  name: string;
}

interface MovieData {
  backdrop_path?: string;
  title: string;
  release_date: string;
  runtime: number;
  genres?: { name: string }[];
  overview: string;
}

interface Credits {
  crew?: CrewMember[];
  cast?: CastMember[];
}




@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  @Input() data!: MovieData;
  @Input() credits!: Credits;

  formatRuntime(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  }

  getUtcTime(dateString: string): number {
    const date = new Date(dateString + 'T00:00:00Z');
    return date.getTime();
  }

  getWriters(): CrewMember[] {
    return this.credits?.crew?.filter(
      (item) => item.department === 'Writing'
    ) || [];
  }

  getDirectors(): CrewMember[] {
    return this.credits?.crew?.filter(
      (item) => item.job === 'Director'
    ) || [];
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  active: string = 'movies';

  constructor(private router: Router) {}

  setActive(section: string) {
    this.active = section;

    switch(section) {
      case 'home':
        this.router.navigate(['/']);
        break;

    }
  }
}

import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { HeroComponent } from '../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,CardComponent,HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

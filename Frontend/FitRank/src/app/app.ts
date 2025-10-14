import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/modules/header/components/header.component';
import { FooterComponent } from '../app/modules/footer/components/footer.component';
import { HomeComponent } from './modules/home/components/home.component';
import { LoginComponent } from './modules/login/components/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent, HomeComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], 
})
export class App {
  protected readonly title = signal('FitRank');
}

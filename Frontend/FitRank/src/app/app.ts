import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/modules/header/components/header.component';
import { FooterComponent } from '../app/modules/footer/components/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/components/login.component';
import { VisitanteHome } from './modules/visitante-home/visitante-home'; 
import { AuthService } from './api/services/activacion/AuthService.service'; 
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component'; 
import { HeaderSocioComponent } from './public/header-socio/header-socio.component';

import gsap from 'gsap';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VisitanteHome,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdminInvitacionComponent,
    
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
 
  ngOnInit() {
    console.log("🔥 AppComponent: Iniciando SignalR");
   
  }

  ngAfterViewInit(): void {

    const preloader = document.getElementById('preloader');
    const logo = document.querySelector('.logo-3d');
    const counter = document.getElementById('counter');
    const phrase = document.getElementById('phrase');

    if (!preloader || !logo || !counter || !phrase) return;

    
    // 🔢 Contador
    const progress = { value: 0 };
    // gsap.to(progress, {
    //   value: 100,
    //   duration: 3.5,
    //   ease: 'power1.out',
    //   onUpdate: () => {
    //     if (counter) counter.textContent = `${Math.round(progress.value)}%`;
    //   },
    //   onComplete: () => {
    //     this.mostrarFrase(preloader, phrase);
    //   }
    // });
  }

  // private mostrarFrase(preloader: HTMLElement, phrase: HTMLElement): void {
  //   const text = 'Potenciá tu gimnasio';
  //   phrase.textContent = '';
  //   let index = 0;

  //   // ✍️ Sonido de tipeo (opcional)
  //   const typingSound = new Audio('assets/sounds/typing.mp3');
  //   typingSound.volume = 0.3;
  //   typingSound.loop = true;
  //   typingSound.play();

  //   const typeInterval = setInterval(() => {
  //     phrase.textContent += text[index];
  //     index++;

  //     // Efecto de cursor titilante
  //     phrase.classList.toggle('cursor');

  //     if (index >= text.length) {
  //       clearInterval(typeInterval);
  //       typingSound.pause();
  //       typingSound.currentTime = 0;
  //       setTimeout(() => this.finalizarPreloader(preloader), 1200);
  //     }
  //   }, 100);
  // }

  // private finalizarPreloader(preloader: HTMLElement): void {
  //   // 🔄 Fade out suave
  //   gsap.to(preloader, {
  //     opacity: 0,
  //     duration: 1.5,
  //     ease: 'power2.out',
  //     onComplete: () => {
  //       preloader.classList.add('hide');
  //       setTimeout(() => {
  //         preloader.remove();
  //         document.body.classList.add('loaded'); // activa el fade-in del visitante-home
  //       }, 400);
  //     }
  //   });
  // }
}


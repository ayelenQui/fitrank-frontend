import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-socio', 
  templateUrl: './home-socio.component.html',
  styleUrls: ['./home-socio.component.css'],
  standalone: true, // déjalo solo si tu proyecto usa componentes standalone
  imports : [HeaderSocioComponent ]
})
export class HomeSocioComponent implements OnInit, AfterViewInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    gsap.from('.titulo', { 
      duration: 1, 
      y: -50, 
      opacity: 0, 
      ease: 'power3.out' 
    });

    gsap.from('.boton', { 
      duration: 0.8, 
      opacity: 0, 
      scale: 0.8, 
      stagger: 0.2, 
      delay: 0.5 
    });

    // Animaciones al hacer scroll
    gsap.utils.toArray('.tarjeta').forEach((tarjeta: any) => {
    gsap.from(tarjeta, {
      scrollTrigger: {
        trigger: tarjeta,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  }

  ngOnInit() {
    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
    }

    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta])
      .then((success) => {
        if (!success) console.error('No se pudo navegar a', ruta);
      })
      .catch((err) => console.error(err));
  }
}

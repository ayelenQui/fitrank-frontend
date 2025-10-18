import { Component, AfterViewInit } from '@angular/core';
import { VisitanteHomeNavbar } from './components/visitante-home-navbar/visitante-home-navbar';
import { VisitanteHomeHero } from './components/visitante-home-hero/visitante-home-hero';
import { VisitanteHomeInfosection } from './components/visitante-home-infosection/visitante-home-infosection';

import { VisitanteHomeFooter } from './components/visitante-home-footer/visitante-home-footer';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../api/services/activacion/AuthService.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-visitante-home',
  imports: [CommonModule, VisitanteHomeNavbar, VisitanteHomeHero, VisitanteHomeInfosection, VisitanteHomeFooter],
  templateUrl: './visitante-home.html',
  styleUrl: './visitante-home.css',
  standalone: true
})

  



export class VisitanteHome {
  constructor(private router: Router, private authService: AuthService) { }

  irLogin() {
    this.router.navigate(['/login']);
  }
  ngAfterViewInit(): void {
    // Animar cada sección al aparecer
    gsap.utils.toArray<HTMLElement>('section').forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 2,
        rotateX: 15,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.3
      });
    });

    // Animar tarjetas individualmente
    gsap.utils.toArray<HTMLElement>('.estilo').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
         
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.from(".card", {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".card",
        start: "top 90%",
      }
    });
    const text = "La plataforma integral para gimnasios que impulsa el crecimiento y la retención de socios.";
    const target = document.getElementById("typing-text");
    if(target) {
      let index = 0;
      const interval = setInterval(() => {
        target.textContent = text.slice(0, index++);
        if (index > text.length) clearInterval(interval);
      }, 50);
    }
  }
}
  



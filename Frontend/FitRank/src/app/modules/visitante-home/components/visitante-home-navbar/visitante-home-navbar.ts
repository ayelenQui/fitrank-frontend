import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { HostListener } from '@angular/core';
import SplitType from 'split-type';
@Component({
  selector: 'app-visitante-home-navbar',
  imports: [RouterLink],
  templateUrl: './visitante-home-navbar.html',
  styleUrl: './visitante-home-navbar.css'
})
export class VisitanteHomeNavbar  implements AfterViewInit  {
  ngAfterViewInit(): void {
    




    gsap.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-sub', { y: 40, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    gsap.from('.cta-demo', { scale: 0.9, opacity: 0, duration: 1, delay: 0.6, ease: 'back.out(1.7)' });
    gsap.utils.toArray('.fade-card').forEach((card: any, i: number) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out'
      });
    });
    gsap.from('.ranking-img', {
      scrollTrigger: {
        trigger: '.ranking-img',
        start: 'top 80%',
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power3.out'
    });
  }
  menuHidden: boolean = true;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

}

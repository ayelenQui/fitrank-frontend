import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import SplitType from 'split-type';

@Component({
  selector: 'app-visitante-home-hero',
  templateUrl: './visitante-home-hero.html',
  styleUrl: './visitante-home-hero.css'
})
export class VisitanteHomeHero implements AfterViewInit {

  ngAfterViewInit(): void {

    const isMobile = window.innerWidth < 768;

    setTimeout(() => {

      // Split del título
      const titulo = new SplitType('.titulo', { types: 'chars' });

      if (titulo.chars?.length) {
        titulo.chars.forEach((char: any, i: number) => {
          gsap.from(char, {
            opacity: 0,
            y: isMobile ? gsap.utils.random(-5, 5) : gsap.utils.random(-20, 20),
            rotate: isMobile ? gsap.utils.random(-10, 10) : gsap.utils.random(-30, 30),
            duration: isMobile ? 0.22 : 0.35,
            delay: i * (isMobile ? 0.01 : 0.015),
            ease: 'power3.out',
          });

          // Hover solo en desktop
          if (!isMobile) {
            char.addEventListener('mouseenter', () => {
              gsap.to(char, {
                scale: 1.5,
                rotate: gsap.utils.random(-5, 5),
                duration: 0.25,
                ease: 'power2.out'
              });
            });

            char.addEventListener('mouseleave', () => {
              gsap.to(char, {
                scale: 1,
                rotate: 0,
                duration: 0.2,
                ease: 'power2.out'
              });
            });
          }
        });
      }

      // MINICARDS
      const minicards = gsap.utils.toArray('.fade-card');
      minicards.forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          opacity: 0,
          y: isMobile ? 20 : 30,
          duration: isMobile ? 0.6 : 0.8,
          delay: i * (isMobile ? 0.1 : 0.15),
          ease: 'power2.out'
        });
      });

    }, 70);

    // NAV LINKS
    const navlin = document.querySelectorAll('.nav-link');
    gsap.from(navlin, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.07
    });

    // CARDS 3D
    gsap.from('.feature-card-3d', {
      opacity: 0,
      y: 40,
      rotationY: -15,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#features',
        start: 'top 80%',
      }
    });
  }
}








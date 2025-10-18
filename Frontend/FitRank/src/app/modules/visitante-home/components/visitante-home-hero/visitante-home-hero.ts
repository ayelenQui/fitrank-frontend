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
    setTimeout(() => {
      // @ts-ignore
      const titulo = new SplitType('.titulo', { types: 'lines, words, chars' });

      if (titulo && Array.isArray(titulo.chars) && titulo.chars.length > 0) {
        titulo.chars.forEach((char: any, i: number) => {
          const charscolor = gsap.timeline();


          charscolor.from(char, {
            y: gsap.utils.random(-10, 10),
            x: gsap.utils.random(-30, 30),
            rotate: gsap.utils.random(-180, 180),
            scale: gsap.utils.random(0.2, 0.1),
            duration: 0.3,
            delay: i * 0.05,
            ease: 'back.out',
            color: `rgb(${gsap.utils.random(0, 1)}, ${gsap.utils.random(0, 1)}, ${gsap.utils.random(0, 1)})`
          });



          // Hover interactivo
          char.addEventListener('mouseenter', () => {
            gsap.to(char, {
              scale: 3,
              rotate: gsap.utils.random(-5,5),
              color: `rgb(${gsap.utils.random(0, 2)}, ${gsap.utils.random(0, 3)}, ${gsap.utils.random(0, 4)})`,
              duration: 0.3,

              ease: 'power3.out'
            });
          });

          char.addEventListener('mouseleave', () => {
            gsap.to(char, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: 'power3.out',
              color: '#000000' 
            });
          });
        });
      }
      const minicards = gsap.utils.toArray('.fade-card');
      minicards.forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          opacity: 1,
          y: -50,
          x: 100,
          duration: 3,
          rotateX: 15,
          scale: 0.95,
          delay: i * 1,
          ease: 'power2.out'
        });
      });
    }
      , 100);
    const navlin = document.querySelectorAll('.nav-link');
    gsap.from(navlin, {
      y: -50,
      opacity: 0,
      duration: 9,
      ease: 'power3.out',
      stagger: 0.1
    });
   
    gsap.from('.feature-card-3d', {
      opacity: 0,
      y: 50,
      rotationY: -20,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#features',
        start: 'top 80%',
      }
    });

  }

}

         
            

          









import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypingService {
  startTypingEffect(text: string, elementId: string, speed: number = 50): void {
    const target = document.getElementById(elementId);
    if (!target) return;

    let index = 0;
    target.textContent = '';

    const interval = setInterval(() => {
      target.textContent = text.slice(0, index++);
      if (index > text.length) clearInterval(interval);
    }, speed);
  }
}

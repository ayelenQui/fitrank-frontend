import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-calcular-puntaje',
  standalone: true,
  imports: [CommonModule, HeaderSocioComponent, SidebarSocioComponent],
  templateUrl: './calcular-puntaje.component.html',
  styleUrls: ['./calcular-puntaje.component.css']
})
export class CalcularPuntajeComponent implements OnInit {
  puntajeEjercicio: number = 0;
  puntajeTotalUsuario: number = 0;
  puntajeAnimado: number = 0;
  displayPuntaje: number = 0;
  rutinaId!: number;
  socioId: number = 0;

  constructor(
    private router: Router,
    private puntajeService: PuntajeService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // 🔹 Obtener datos del navigation state
    const navigation = history.state;
    this.puntajeEjercicio = navigation.puntaje || 0;
    this.rutinaId = navigation.rutinaId;

    // 🔹 Obtener el socio logueado
    const user = this.auth.obtenerUser();
    this.socioId = user.Id;

    // 🔹 Animar el puntaje del ejercicio actual
    this.animarPuntaje();

    // 🔹 Cargar el puntaje total del usuario
    this.obtenerPuntajeTotalUsuario();
  }

  volverARutina(): void {
    if (this.rutinaId) {
      this.router.navigate(['/rutina/iniciar-rutina', this.rutinaId]);
    } else {
      this.router.navigate(['/rutina']);
    }
  }

  // ✅ Llama al endpoint que trae el puntaje total del socio
  obtenerPuntajeTotalUsuario(): void {
    if (this.socioId) {
      this.puntajeService.obtenerPuntajeTotal(this.socioId).subscribe({
        next: (data) => {
          this.puntajeTotalUsuario = Math.round(data); // 🔹 Redondea al entero más cercano
          console.log('🏋️ Puntaje total del socio:', this.puntajeTotalUsuario);
        },
        error: (err) => console.error('❌ Error al obtener puntaje total:', err)
      });
    } else {
      console.warn('⚠️ No se encontró el socio logueado ' + this.socioId);
    }
  }

  // ✅ Animación con GSAP (solo una vez)
  animarPuntaje(): void {
    this.puntajeAnimado = 0;
    this.displayPuntaje = 0;

    this.ngZone.runOutsideAngular(() => {
      gsap.to(this, {
        duration: 1.6,
        puntajeAnimado: this.puntajeEjercicio,
        ease: 'power2.out',
        onUpdate: () => {
          this.ngZone.run(() => {
            this.displayPuntaje = Math.round(this.puntajeAnimado);
            this.cd.detectChanges();
          });
        },
        onComplete: () => {
          this.ngZone.run(() => {
            this.displayPuntaje = Math.round(this.puntajeAnimado);
            this.cd.detectChanges();
          });
        }
      });
    });
  }

  
}

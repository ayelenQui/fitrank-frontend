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
  styleUrls: ['./calcular-puntaje.component.css', '../../css-socio/socio-common.css']
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
   
    const navigation = history.state;
    this.puntajeEjercicio = navigation.puntaje || 0;
    this.rutinaId = navigation.rutinaId;

   
    const user = this.auth.obtenerUser();
    this.socioId = user.id;


    this.animarPuntaje();

    
    this.obtenerPuntajeTotalUsuario();
  }

 volverARutina(): void {
  // Recuperamos state original que nos dio iniciar-rutina
  const navState: any = history.state || {};

    if (navState.sinEjercicios) {
    localStorage.removeItem(`actividades_${this.socioId}`);

    this.router.navigate(['/rutina']);
    return;
  }

  const rutinaId = navState.rutinaId ?? this.rutinaId;
  const sesionId = navState.sesionId;
  const entrenamientoId = navState.entrenamientoId;

  // Navegamos explícitamente de vuelta a iniciar-rutina pasando la info para restaurar
  if (rutinaId) {
    const stateToReturn: any = {};
    if (sesionId) stateToReturn.sesionId = sesionId;
    if (entrenamientoId) stateToReturn.entrenamientoId = entrenamientoId;
    // También podríamos reenviar puntaje si queremos, p.ej. stateToReturn.puntaje = this.puntajeEjercicio;

    this.router.navigate(['/rutina/iniciar-rutina', rutinaId], { state: stateToReturn });
  } else {
    // fallback a la vista principal de rutinas
    this.router.navigate(['/rutina']);
  }
}



  
  obtenerPuntajeTotalUsuario(): void {
    if (this.socioId) {
      this.puntajeService.obtenerPuntajeTotal(this.socioId).subscribe({
        next: (data) => {
          this.puntajeTotalUsuario = Math.round(data); 
          console.log('🏋️ Puntaje total del socio:', this.puntajeTotalUsuario);
        },
        error: (err) => console.error('❌ Error al obtener puntaje total:', err)
      });
    } else {
      console.warn('⚠️ No se encontró el socio logueado ' + this.socioId);
    }
  }

  
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

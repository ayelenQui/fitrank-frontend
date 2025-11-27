import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { BatallaService } from '@app/api/services/batallas/batalla.service';
import { CrearBatallaDTO } from '@app/api/services/batallas/interface/batalla.interface';
import { BatallaTipo } from '@app/api/services/batallas/interface/batalla.model';
import {  SocioService } from '@app/api/services/socio/socio.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import gsap from 'gsap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-batalla',
  templateUrl: './crear-batalla.component.html',
  styleUrls: ['./crear-batalla.component.css','../../../css-socio/socio-common.css'],
  imports
    : [FormsModule,CommonModule,HeaderSocioComponent,SidebarSocioComponent]
})
export class CrearBatallaComponent implements OnInit, AfterViewInit {

  user = this.auth.obtenerUser()
  socioActualId = this.user?.id; // Temporal hasta integrar login
  socios: any[] = [];
  usuarioSeleccionado!: number;
    BatallaTipo = BatallaTipo;
    tipoSeleccionado: BatallaTipo = BatallaTipo.Puntos;
  diasDuracion = 7;
  mensaje: string | null = null;

  constructor(
    private batallaService: BatallaService, 
    private socioService: SocioService,
    private auth: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.socioService.obtenerSocios().subscribe({
    next: (data) => {
      this.socios = data.filter(s => s.id !== this.socioActualId);
    },
    error: (err) => console.error("Error al cargar socios", err)
  });
  }

crear(): void {
  if (!this.usuarioSeleccionado) return;

  const dto: CrearBatallaDTO = {
    socioAId: this.socioActualId,
    socioBId: this.usuarioSeleccionado,
    tipo: BatallaTipo.Puntos,
    diasDuracion: this.diasDuracion
  };

  this.batallaService.crear(dto).subscribe({
    next: (res) => {
      // this.mensaje = "Batalla creada correctamente 🎉";
      Swal.fire({
        icon: 'success',
        title: '¡Batalla creada correctamente! ',
        showConfirmButton: false,
        timer: 1500,
        confirmButtonColor: '#8c52ff',
      });

      // Animación GSAP del mensaje
      setTimeout(() => {
        const alerta = document.querySelector('.alerta-exito');
        if (alerta) {
          gsap.fromTo(alerta,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        }
      });

      // Redirigir después de mostrar el mensaje
      setTimeout(() => {
        this.location.back(); // <- volver a "Mis Batallas"
      }, 1500);

    },
    error: (err) => console.error("Error al crear batalla", err)
  });
}


  ngAfterViewInit() {
    gsap.fromTo('.titulo',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo('.form-batalla .form-group',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'power3.out' }
    );

    gsap.fromTo('.btn-crear',
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, delay: 0.5, ease: 'power3.out' }
    );

    // Hover botón
    const btnCrear = document.querySelector('.btn-crear');
    btnCrear?.addEventListener('mouseenter', () => gsap.to(btnCrear, { scale: 1.1, duration: 0.1 }));
    btnCrear?.addEventListener('mouseleave', () => gsap.to(btnCrear, { scale: 1, duration: 0.1 }));
  }

  volverAtras(): void {
    this.location.back();
  }
}

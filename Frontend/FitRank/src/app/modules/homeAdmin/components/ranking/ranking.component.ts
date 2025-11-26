import {  Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { ConfiguracionGrupoMuscularService } from '@app/api/services/configuracionGrupoMuscular/configuracionGrupoMuscular.service';
import { AgregarConfiguracionGrupoMuscularDTO, ConfiguracionGrupoMuscularDTO } from '@app/api/services/configuracionGrupoMuscular/interfaces/configuracionGrupoMuscular.interface';
import { FormsModule } from '@angular/forms';
import { GrupoMuscularDTO } from '../../../../api/services/grupoMuscular/grupoMuscular.interface';
import { GrupoMuscularService } from '../../../../api/services/grupoMuscular/grupoMuscular.service';
import { gsap } from 'gsap';
import Swal from 'sweetalert2';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  gruposMusculares: GrupoMuscularDTO[] = [];
  
  user = this.auth.obtenerUser()
  gimnasioId = this.user.gimnasioId; 
  grupoSeleccionado: number = 0;
  cantidad: number = 20;
  tieneConfiguracion = false;
  configuracionActual: ConfiguracionGrupoMuscularDTO | null = null;
  tooltipActivo: string | null = null;
  ranking: any[] = [];
  cargando = true;
  panelAbierto = false;
  configuracion: AgregarConfiguracionGrupoMuscularDTO = {
    GrupoMuscularId: 0,
    MultiplicadorPeso: 0,
    MultiplicadorRepeticiones: 0,
    FactorProgresion: 0
  };
  vista: string = 'estado';



  simPeso: number = 0;
  simReps: number = 0;
  simResultado: number = 0;

  constructor(
    private puntajeService: PuntajeService,
    private ngZone: NgZone,
    private configuracionGrupoMuscularService: ConfiguracionGrupoMuscularService,
    private grupoMuscularService: GrupoMuscularService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.verificarConfiguracion();
    this.cargarGruposMusculares();
    this.cargarRanking();
  }
  scrollToForm() {
    const form = document.getElementById('form-config');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  abrirPanel() {
    this.panelAbierto = true;
  }

  cerrarPanel() {
    this.panelAbierto = false;
  }
  getNombreGrupoSeleccionado(): string {
    if (!this.gruposMusculares || this.gruposMusculares.length === 0) return '';
    const encontrado = this.gruposMusculares.find(g => g.id === this.configuracion.GrupoMuscularId);
    return encontrado ? encontrado.nombre : '';
  }

  cargarGruposMusculares() {
    this.grupoMuscularService.obtenerTodos().subscribe({
      next: (data) => {
        this.gruposMusculares = data;

        // 👉 Si NO hay selección, asignar el primer grupo muscular
        if (this.configuracion.GrupoMuscularId === 0 && data.length > 0) {
          this.configuracion.GrupoMuscularId = data[0].id;
        }

        // Volvés a verificar la configuración ahora que ya hay un grupo
        this.verificarConfiguracion();
      },
      error: (err) => {
        console.error("❌ Error al cargar grupos musculares", err);
      }
    });
  }


  verificarConfiguracion() {
    this.configuracionGrupoMuscularService.obtenerTodas().subscribe({
      next: (configs) => {

        // 👉 Si hay al menos una configuración, el ranking SIEMPRE está activo
        this.tieneConfiguracion = configs && configs.length > 0;

        if (!this.tieneConfiguracion) {
          this.configuracionActual = null;
          return;
        }

        // 👉 Buscar config del grupo seleccionado
        const encontrada = configs.find(c =>
          c.GrupoMuscularId === this.configuracion.GrupoMuscularId
        );

        if (encontrada) {
          this.configuracionActual = encontrada;

          this.configuracion = {
            GrupoMuscularId: encontrada.GrupoMuscularId,
            MultiplicadorPeso: encontrada.MultiplicadorPeso,
            MultiplicadorRepeticiones: encontrada.MultiplicadorRepeticiones,
            FactorProgresion: encontrada.FactorProgresion
          };

          this.cargarRanking();
        } else {
          // 👉 No hay configuración para este grupo muscular
          // pero igual el ranking SIGUE ACTIVO
          this.configuracionActual = null;
        }

      },
      error: () => {
        console.error("❌ Error al obtener configuraciones");
        this.tieneConfiguracion = false;
        this.configuracionActual = null;
      }
    });
  }


  agregarConfiguracion() {
    this.configuracionGrupoMuscularService.agregar(this.configuracion).subscribe({
      next: () => {
        alert("Configuración guardada correctamente");
        this.verificarConfiguracion(); // Recargar estado
      },
      error: () => alert("Error al guardar configuración")
    });
  }

  actualizarConfiguracion() {

    // 👉 Buscar configuración del grupo muscular actual
    this.configuracionGrupoMuscularService.obtenerTodas().subscribe({
      next: (configs) => {

        const existente = configs.find(c =>
          c.GrupoMuscularId === this.configuracion.GrupoMuscularId
        );

        // ======================================================
        // 1️⃣ SI EXISTE → ACTUALIZAR
        // ======================================================
        if (existente) {
          this.configuracionGrupoMuscularService.actualizarConfiguracion(existente.Id, {
            GrupoMuscularId: this.configuracion.GrupoMuscularId,
            MultiplicadorPeso: this.configuracion.MultiplicadorPeso,
            MultiplicadorRepeticiones: this.configuracion.MultiplicadorRepeticiones,
            FactorProgresion: this.configuracion.FactorProgresion
          }).subscribe({
            next: () => {
              Swal.fire({
                title: "¡Actualizado!",
                text: "Configuración modificada correctamente.",
                icon: "success",
                confirmButtonColor: "#7B3FE4"
              });
              this.verificarConfiguracion();
              this.cerrarPanel();
            }
          });

          return;
        }

        // ======================================================
        // 2️⃣ SI NO EXISTE → AGREGAR CONFIG PARA ESE GRUPO
        // ======================================================
        this.configuracionGrupoMuscularService.agregar(this.configuracion).subscribe({
          next: () => {
            Swal.fire({
              title: "Creado",
              text: "Se creó la configuración para este grupo muscular.",
              icon: "success",
              confirmButtonColor: "#7B3FE4"
            });
            this.verificarConfiguracion();
            this.cerrarPanel();
          }
        });

      }
    });
  }


  private cargarRanking(): void {
    this.puntajeService.obtenerRanking(this.gimnasioId,this.cantidad).subscribe({
      next: (data) => {
        this.ranking = data ?? [];
        this.cargando = false;

        setTimeout(() => {
          this.animarTitulo();
          this.animarRanking();
        }, 100);
      },
      error: () => {
        this.cargando = false;
      }
    });
  }


  private animarTitulo(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo('.titulo', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    });
  }

  private animarRanking(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo('.card-ranking', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 });
    });
  }

  getMedalla(index: number): string {
    const medallas = ['🥇', '🥈', '🥉'];
    return medallas[index] ?? '';
  }
  mostrarTooltip(campo: string) {
    this.tooltipActivo = campo;
  }

  ocultarTooltip() {
    this.tooltipActivo = null;
  }
  calcularSimulacion() {
    const peso = this.simPeso || 0;
    const reps = this.simReps || 0;

    const mp = this.configuracion.MultiplicadorPeso || 1;
    const mr = this.configuracion.MultiplicadorRepeticiones || 1;
    const fp = this.configuracion.FactorProgresion || 1;

    // Fórmula de ejemplo (la misma que tu ranking usa)
    this.simResultado = (peso * mp) + (reps * mr) * fp;

    // Para evitar números locos
    if (this.simResultado < 0) this.simResultado = 0;
  }

}

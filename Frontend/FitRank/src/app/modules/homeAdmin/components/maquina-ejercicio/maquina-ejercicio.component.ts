import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MaquinaService, Maquina } from '@app/api/services/maquina/maquina.service';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { GrupoMuscularService } from '@app/api/services/grupoMuscular/grupoMuscular.service'; 




@Component({
  selector: 'app-maquinaejercicio',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule
  ],
  templateUrl: './maquina-ejercicio.component.html',
  styleUrls: ['./maquina-ejercicio.component.css']
})
export class MaquinaejercicioComponent implements OnInit {

  gruposMusculares: any[] = [];

  activeTab: 'maquinas' | 'ejercicios' = 'maquinas';

  maquinas: Maquina[] = [];
  ejercicios: EjercicioDTO[] = [];

  loadingMaquinas = false;
  loadingEjercicios = false;


  showMaquinaModal = false;
  showEjercicioModal = false;

  nuevaMaquina = {
    nombre: '',
    urlImagen: ''
  };

  nuevoEjercicio: any = {
    nombre: '',
    descripcion: '',
    duracionEstimada: null,
    urlVideo: '',
    urlImagen: '',
    maquinaId: null
  };

  constructor(
    private maquinaService: MaquinaService,
    private ejercicioService: EjercicioService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private grupoMuscularService: GrupoMuscularService
  ) { }

  ngOnInit(): void {
    this.cargarMaquinas();
    this.cargarEjercicios();
    this.grupoMuscularService.obtenerTodos().subscribe(res => {
      this.gruposMusculares = res;
    });
  }

  cambiarTab(tab: 'maquinas' | 'ejercicios') {
    this.activeTab = tab;
  }
  convertirAEmbed(url: string) {
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }


  cargarMaquinas() {
    this.loadingMaquinas = true;
    this.maquinaService.obtenerTodas().subscribe({
      next: res => {
        this.maquinas = res;
        this.loadingMaquinas = false;
      },
      error: () => this.loadingMaquinas = false
    });
  }

  cargarEjercicios() {
    this.loadingEjercicios = true;
    this.ejercicioService.getAll().subscribe({
      next: res => {
        this.ejercicios = res;
        this.loadingEjercicios = false;
      },
      error: () => this.loadingEjercicios = false
    });
  }

  verDetalleMaquina(id: number) {
    
    this.router.navigate(['/maquina', id]);

  }

  verEjerciciosDeMaquina(id: number) {
    this.router.navigate(['/admin/maquina', id], { queryParams: { tab: 'ejercicios' } });
  }

  imprimirQR(qrBase64: string) {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<img src="${qrBase64}" style="width:300px;margin-top:20px;">`);
    win.print();
  }

  abrirModalMaquina() {
    Swal.fire({
      title: '<span class="swal-title">Agregar máquina</span>',
      width: '650px',
      background: 'black',
      html: `
      <style>
        .swal-title {
          font-size: 30px;
          font-weight: 700;
          font-family: Beubasneue, sans-serif;
          color: white;
        }

        .swal2-popup {
          background: #0d0d0d !important;
          border-radius: 18px !important;
          padding: 30px !important;
        }

        .swal2-input, .swal2-textarea, .swal2-select {
          background: #141414 !important;
          border: 1px solid #555 !important;
          border-radius: 10px !important;
          color: white !important;
          padding: 10px !important;
          margin-top: 10px !important;
        }

        .swal2-input::placeholder,
        .swal2-textarea::placeholder {
          color: #aaa !important;
        }

        .swal2-confirm {
         background: linear-gradient(90deg, #9333ea, #7c3aed) !important;
          border-radius: 10px !important;
          font-weight: 700 !important;
        }

        .swal2-cancel {
          background: #333 !important;
          border-radius: 10px !important;
          color: white !important;
        }
      </style>

      <input id="nombre" class="swal2-input" placeholder="Nombre de la máquina">
      <input id="url" class="swal2-input" placeholder="URL de imagen o video">
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          urlImagen: (document.getElementById('url') as HTMLInputElement).value
        };
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.maquinaService.agregar(result.value).subscribe(() => {
          this.cargarMaquinas();

          // Mensaje de éxito
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Máquina agregada con éxito',
            showConfirmButton: false,
            timer: 1800,
            background: '#0d0d0d',
            color: 'white'
          });
        });
      }
    });
  }

  guardarMaquina() {
    if (!this.nuevaMaquina.nombre) return;

    this.maquinaService.agregar(this.nuevaMaquina).subscribe({
      next: () => {
        this.showMaquinaModal = false;
        this.cargarMaquinas();
        Swal.fire({
          title: '¡Máquina agregada!',
          html: '<b>La máquina se registró con éxito</b>',
          icon: 'success',
          background: '#0f0f0f',
          color: '#fff',
          iconColor: '#00e676', // verde eléctrico tipo FitRank
          timer: 1800,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
      }
    });
  }
  
      
    
  

  generarOpcionesGrupoMuscular() {
    return this.gruposMusculares
      .map(g => `<option value="${g.id}">${g.nombre}</option>`)
      .join('');
  }


  abrirModalEjercicio() {
    const opcionesMaquina = this.generarOpcionesMaquina();
    const opcionesGrupo = this.generarOpcionesGrupoMuscular();

    Swal.fire({
      title: 'Agregar ejercicio',
      width: '650px',
      background: 'black',
      html: `
      <style>
        .swal2-popup {
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }
        .swal2-title {
          font-size: 30px !important;
          font-weight: 700;
          color: white;
        }
        .swal2-input, .swal2-textarea, .swal2-select {
          border-radius: 10px;
          border: 1px solid #d0d0d0;
          padding: 10px 14px;
          font-size: 14px;
          margin-top: 8px;
          width: 100%;
        }
        .swal2-textarea {
          height: 80px;
        }
        .swal2-confirm {
          background: linear-gradient(90deg, #9333ea, #7c3aed) !important;
          color: white !important;
          border-radius: 10px !important;
          padding: 10px 25px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
        }
        .swal2-cancel {
          background: #f3f3f3 !important;
          color: #555 !important;
          border-radius: 10px !important;
          padding: 10px 25px !important;
          font-size: 15px !important;
          font-weight: 500 !important;
        }
        .swal2-actions {
          gap: 12px;
          margin-top: 25px;
        }
        .lbl {
          display:block;
          text-align:left;
          margin-top:12px;
          font-weight:600;
          color:#4b5563;
        }
      </style>

      <input id="nombre" class="swal2-input" placeholder="Nombre">

      <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>

      <input id="duracion" class="swal2-input" type="number" placeholder="Duración (seg)">
      <input id="urlImg" class="swal2-input" placeholder="URL imagen">
      <input id="urlVideo" class="swal2-input" placeholder="URL video">

      <label class="lbl">Máquina</label>
      <select id="maquinaId" class="swal2-select">
        <option value="">Sin máquina</option>
        ${opcionesMaquina}
      </select>

      <label class="lbl">Grupo muscular</label>
      <select id="grupoId" class="swal2-select">
        ${opcionesGrupo}
      </select>

      <label class="lbl">Tipo de ejercicio</label>
      <select id="tipo" class="swal2-select">
        <option value="0">Compuesto</option>
        <option value="1">Aislado</option>
        <option value="2">Cardio</option>
      </select>

      <label class="lbl">Equipo necesario</label>
      <select id="equipo" class="swal2-select">
        <option value="0">Máquina</option>
        <option value="1">Mancuernas</option>
        <option value="2">Barra</option>
        <option value="3">Libre</option>
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const dur = (document.getElementById('duracion') as HTMLInputElement).value;
        const maq = (document.getElementById('maquinaId') as HTMLSelectElement).value;

        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          duracionEstimada: dur ? Number(dur) : null,
          urlImagen: (document.getElementById('urlImg') as HTMLInputElement).value,
          urlVideo: (document.getElementById('urlVideo') as HTMLInputElement).value,
          maquinaId: maq ? Number(maq) : null,
          grupoMuscularId: Number((document.getElementById('grupoId') as HTMLSelectElement).value),
          tipo: Number((document.getElementById('tipo') as HTMLSelectElement).value),
          equipoNecesario: Number((document.getElementById('equipo') as HTMLSelectElement).value),
          tags: [],
          contraIndicaciones: []
        };
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.ejercicioService.create(result.value).subscribe({
          next: () => this.cargarEjercicios()
        });
      }
    });
  }



  generarOpcionesMaquina() {
    return this.maquinas
      .map(m => `<option value="${m.id}">${m.nombre}</option>`)
      .join('');
  }

  guardarEjercicio() {
    if (!this.nuevoEjercicio.nombre) return;

    this.ejercicioService.create(this.nuevoEjercicio).subscribe({
      next: () => {
        this.showEjercicioModal = false;
        this.cargarEjercicios();

        Swal.fire({
          title: '¡Ejercicio agregado!',
          html: '<b>El ejercicio se registró con éxito</b>',
          icon: 'success',
          background: '#0f0f0f',
          color: '#fff',
          iconColor: '#4caf50',
          timer: 1800,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    });
  }
  embedVideo(url: string) {
    if (!url) return '';

    // Si es formato normal de YouTube
    if (url.includes('watch?v=')) {
      const id = url.split('v=')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Short links
    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Shorts
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Ya es un embed o algo que no requiere parseo
    return url;
  }

}

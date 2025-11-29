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
import { ImagenApiService } from '@app/api/services/imagen/imagen-api.service'; 



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

  
  archivoSeleccionado: File | null = null;


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
    private grupoMuscularService: GrupoMuscularService,
    private imagenApiService: ImagenApiService,




  ) {

    window.addEventListener('file-selected', (e: any) => {
      this.archivoSeleccionado = e.detail;
    });
}



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
          iconColor: '#00e676',
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
      </style>

      <input id="nombre" class="swal2-input" placeholder="Nombre">

      <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>

      <input id="duracion" class="swal2-input" type="number" placeholder="Duración (seg)">

      <label class="lbl">Imagen</label>
      <input id="fileImg" type="file" accept="image/*" class="swal2-input"
             onchange="window.dispatchEvent(new CustomEvent('file-selected',{ detail: this.files[0] }))">

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
          descripcion: (document.getElementById('descripcion') as HTMLTextAreaElement).value,
          duracionEstimada: dur ? Number(dur) : null,
          urlImagen: '', 
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

        if (this.archivoSeleccionado) {
          this.imagenApiService.subirImagen(this.archivoSeleccionado).subscribe({
            next: (resp) => {

              result.value.urlImagen = resp.url;

              this.ejercicioService.create(result.value).subscribe({
                next: () => this.cargarEjercicios()
              });
            }
          });
        }
        else {
          this.ejercicioService.create(result.value).subscribe({
            next: () => this.cargarEjercicios()
          });
        }
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

    if (url.includes('watch?v=')) {
      const id = url.split('v=')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }

  editarEjercicio(ejercicio: EjercicioDTO) {

    Swal.fire({
      title: 'Editar ejercicio',
      width: '650px',
      background: 'black',
      html: `
      <input id="nombre" class="swal2-input" value="${ejercicio.nombre}">
      <textarea id="descripcion" class="swal2-textarea">${ejercicio.descripcion}</textarea>

      <input id="duracion" class="swal2-input" 
             type="number"
             value="${ejercicio.duracionEstimada}">

      <label class="lbl">Imagen actual</label>
      <img src="${ejercicio.urlImagen || ''}" 
           style="width:120px;border-radius:8px;margin:10px auto;display:block">

      <input id="fileImg" type="file" accept="image/*" class="swal2-input"
             onchange="window.dispatchEvent(new CustomEvent('file-selected',{ detail: this.files[0] }))">

      <input id="urlVideo" class="swal2-input"
             value="${ejercicio.urlVideo || ''}"
             placeholder="URL YouTube">
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',

      preConfirm: async () => {
        const fileInput = document.getElementById('fileImg') as HTMLInputElement;

        let nuevaImagen = ejercicio.urlImagen;

        if (fileInput.files && fileInput.files.length > 0) {
          const archivo = fileInput.files[0];

          const resp = await this.imagenApiService.subirImagen(archivo).toPromise();

          nuevaImagen = resp.url;
        }

        return {
          id: ejercicio.id,
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLTextAreaElement).value,
          duracionEstimada: Number((document.getElementById('duracion') as HTMLInputElement).value),
          urlImagen: nuevaImagen,
          urlVideo: (document.getElementById('urlVideo') as HTMLInputElement).value,
          grupoMuscularId: ejercicio.grupoMuscularId,
          maquinaId: ejercicio.maquinaId
        };
      }
    }).then(result => {

      if (result.isConfirmed) {

        const dto = result.value;

        this.ejercicioService.update(dto.id, dto).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Ejercicio actualizado',
              timer: 1500,
              toast: true,
              position: 'top-end',
              showConfirmButton: false
            });

            this.cargarEjercicios();
          }
        });
      }
    });
  }



}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { SocioApiService } from "../../../../api/services/socio/socioApiService"
import { Socio as SocioType } from "../../../../api/services/socio/interfaces/socio.interface"
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swal from 'sweetalert2';
import { NotificacionDTO } from '../../../../api/services/notificacion/interface/notificacion.interface';
import { NotificacionService } from '../../../../api/services/notificacion/notificacion.service';
import { Socio } from '@app/api/services/socio/socio.service';
import { HeaderProfesorComponent } from '@app/public/header-profesor/header-profesor-component';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';
import { MedidaCorporalService } from '@app/api/services/medida/medida-corporal.service';
import { FormsModule } from '@angular/forms';
import { ImagenApiService } from '@app/api/services/imagen/imagen-api.service'; 
import { FooterComponent } from '@app/modules/footer/components/footer.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { MercadoPagoService } from '@app/api/services/mercado-pago/mercado-pago.service';
import { AsistenciaService } from '@app/api/services/asistencia/asistencia.service'; 

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-socio',
  templateUrl: './home-socio.component.html',
  styleUrls: ['./home-socio.component.css'],
  standalone: true,
  imports: [HeaderSocioComponent, CommonModule, HeaderProfesorComponent, FormsModule, FooterComponent, SidebarSocioComponent]
})
export class HomeSocioComponent implements OnInit, AfterViewInit {
  user: any = null;
  mostrarRetencion = false;
  notificacion: NotificacionDTO | null = null;

  socio: SocioType | null = null;
  esProfesor = false;
  fotoArchivo: File | null = null;
  personasDentro: number = 0;
  ultimaMedida: any = null;

  diasRestantesCuota: number | null = null;
  notificaciones: NotificacionDTO[] = [];


  ocupacion: Array<{
    nombre: string;
    foto: string | null;
    fecha: Date;
    tipo: 'entrada' | 'salida';
  }> = [];


  pins: any[] = [];

  mostrarEditarPerfil = false;
  mostrarMedidas = false;

  qrImage: string | null = null;
  mostrarQR: boolean = false;
  formEditar = {
    nombre: '',
    apellido: '',
    sexo: '',
    fotoUrl: '',
    altura: 0,
    peso: 0
  };

  formMedida = {
    pechoCm: 0,
    cinturaCm: 0,
    caderaCm: 0,
    brazoDerechoCm: 0,
    brazoIzquierdoCm: 0,
    pesoKg: 0
  };

  historialMedidas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService,
    private socioService: SocioApiService,
    private signalRNoti: SignalRNotificacionesService,
    private medidaService: MedidaCorporalService,
    private imagenApiService: ImagenApiService,
    private pagosService: MercadoPagoService,
    private asistenciaService: AsistenciaService
  ) { }

  ngAfterViewInit() {
    gsap.from('.titulo', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.boton', {
      duration: 0.8,
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      delay: 0.5
    });

  
    gsap.utils.toArray('.tarjeta').forEach((tarjeta: any) => {
      gsap.from(tarjeta, {
        scrollTrigger: {
          trigger: tarjeta,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  ngOnInit() {
   
    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.asistenciaService.getOcupacionActual().subscribe(res => {
      this.personasDentro = res.personasDentro;
    });
    this.signalRNoti.iniciarConexion();

    this.signalRNoti.notificacion$.subscribe(n => {
        
      
      Swal.fire({
        icon: 'info',
        title: '🔔 Nueva notificación',
        text: `${n.titulo} - ${n.mensaje}`,
        timer: 2500,
        showConfirmButton: false
      });
    });

    this.signalRNoti.ocupacion$.subscribe(evento => {
      if (!evento) return;

      this.mostrarCartelitoOcupacion(evento);
      if (evento.tipo === "entrada") {

        this.personasDentro++;


        this.pins.push({
          id: evento.usuarioId,

          nombre: evento.nombre,
          foto: evento.foto,
          top: Math.random() * 65 + 15,
          left: Math.random() * 65 + 15,
          hora: new Date(evento.fecha)
        });
      }
      if (evento.tipo === "salida") {
        this.personasDentro--;
      }

      this.ocupacion.unshift({

        nombre: evento.nombre,
        foto: evento.foto,
        fecha: new Date(evento.fecha),
        tipo: evento.tipo
      });
      this.pins = this.pins.filter(p => p.id !== evento.usuarioId);
    });

   


    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    const rol = this.user.rol?.toLowerCase();
    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
      return;
    }
    this.esProfesor = rol === 'profesor';

    if (!this.esProfesor) {
     
        this.cargarDatosSocio();
      

      
      this.socioService.getSocioById(this.user.id).subscribe({
        next: (socio: SocioType) => {
          this.socio = socio;
        },
        error: (err) => {
          console.error('Error al cargar socio:', err);
        }
      });
    }
   
    const token = this.authService.obtenerToken();
    if (token) {
      this.notificacionService.getMisNotificaciones().subscribe({
        next: (res) => {
          const lista = res.notificaciones || [];
        
          const retencion = lista.find(n =>
            n.titulo.includes('FitRank') && !n.leido && n.activa
          );

          if (retencion) {
            this.notificacion = retencion;
            this.mostrarRetencion = true;
          }
        },
        error: (err) => console.error('Error al obtener notificaciones:', err)
      });
    }
  }

  responder(opcion: string) {
    let mensaje = '';

    switch (opcion) {
      case 'cambiar-rutina':
        mensaje = 'Un profesor te ayudará a ajustar tu rutina.';
        break;
      case 'estoy-bien':
        mensaje = 'Nos alegra saber que todo va bien.';
        break;
      case 'contactar-profesor':
        mensaje = 'Un entrenador se pondrá en contacto con vos pronto.';
        break;
    }

    Swal.fire({
      title: '¡Gracias!',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#8c52ff'
    });

  
    const token = this.authService.obtenerToken();
    if (token && this.notificacion) {
      this.notificacionService.marcarComoLeida( this.notificacion.id).subscribe();
    }

    this.mostrarRetencion = false;
  }


  calcularDiasRestantes() {
    if (!this.socio?.cuotaPagadaHasta) {
      this.diasRestantesCuota = null;
      return;
    }

    const hoy = new Date();
    const vencimiento = new Date(this.socio.cuotaPagadaHasta);

    hoy.setHours(0, 0, 0, 0);
    vencimiento.setHours(0, 0, 0, 0);

    const diffMs = vencimiento.getTime() - hoy.getTime();
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    this.diasRestantesCuota = dias;
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
  toggleEditarPerfil() {
    this.mostrarEditarPerfil = !this.mostrarEditarPerfil;

    if (this.socio) {
      this.formEditar = {
        nombre: this.socio.nombre,
        apellido: this.socio.apellido,
        sexo: this.socio.sexo,
        fotoUrl: this.socio.fotoUrl,
        altura: this.socio.altura,
        peso: this.socio.peso
      };
    }
  }

  guardarPerfil() {

    if (this.fotoArchivo) {
      this.imagenApiService.subirImagen(this.fotoArchivo).subscribe({
        next: (res) => {
         
          this.formEditar.fotoUrl = res.url;

          this.actualizarPerfil();
        },
        error: (err) => {
          console.error("Error al subir imagen:", err);
          Swal.fire("Error", "No se pudo subir la foto", "error");
        }
      });

    } else {
      this.actualizarPerfil();
    }
  }

  actualizarPerfil() {
    this.socioService.actualizarPerfil(this.socio!.id!, this.formEditar)
      .subscribe({
        next: () => {
          Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
          this.cargarDatosSocio();
          this.mostrarEditarPerfil = false;
        },
        error: (err) => {
          console.error(err);
          Swal.fire("Error", "No se pudo actualizar el perfil", "error");
        }
      });
  }




  guardarMedida() {
    const dto = {
      socioId: this.socio!.id,
      ...this.formMedida
    };

    this.medidaService.agregar(dto)
      .subscribe(() => {
        this.cargarHistorialMedidas();
        this.formMedida = {
          pechoCm: 0,
          cinturaCm: 0,
          caderaCm: 0,
          brazoDerechoCm: 0,
          brazoIzquierdoCm: 0,
          pesoKg: 0
        };
      });
  }
  cargarHistorialMedidas() {
    this.medidaService.obtenerHistorial(this.socio!.id)
      .subscribe(res => {
        this.historialMedidas = res;
      });
  }
  cargarDatosSocio() {

    
    this.socioService.getSocioById(this.user.id).subscribe({
      next: (socio) => {
        this.socio = socio;
        this.calcularDiasRestantes();
    
        this.formEditar = {
          nombre: socio.nombre,
          apellido: socio.apellido,
          sexo: socio.sexo,
          fotoUrl: socio.fotoUrl,
          altura: socio.altura,
          peso: socio.peso
        };

  
        this.medidaService.obtenerHistorial(this.socio.id).subscribe({
          next: (historial) => {
            this.historialMedidas = historial || [];

            if (this.historialMedidas.length > 0) {
              this.ultimaMedida = this.historialMedidas[0];
            } else {
              this.ultimaMedida = null;
            }
          },
          error: (err) => {
            console.error("Error al cargar historial de medidas:", err);
            this.historialMedidas = [];
            this.ultimaMedida = null;
          }
        });
      },
      error: (err) => {
        console.error("Error al cargar socio:", err);
        this.socio = null;
      }
    });
  }
  toggleMedidas() {
    this.mostrarMedidas = !this.mostrarMedidas;

    if (this.mostrarMedidas) {
      this.cargarHistorialMedidas();
    }
  }
  onSeleccionarFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.fotoArchivo = file;
  }
  
  renovarCuota() {
    const email = this.user.email;

    this.pagosService.renovarCuota(this.user.id, email)
      .subscribe({
        next: (res) => {
          this.qrImage = res.qrImage;   // trae el base64
          this.mostrarQR = true;        // abre el modal
        },
        error: (err) => console.error("MP error:", err)
      });
  }

  navegarNoti(ruta: string) {
    this.router.navigate([ruta]);
  }
  abrirNotificacion(n: NotificacionDTO) {
    
    this.notificacionService.marcarComoLeida(n.id).subscribe({
      next: () => {
        n.leido = true; 

       
        this.router.navigate(['/notificaciones']);
      },
      error: (err) => console.error("Error marcando como leída:", err)
    });
  }
  navegarNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  mostrarCartelitoOcupacion(ev: any) {
    const hora = new Date(ev.fecha).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const color = ev.tipo === 'entrada' ? '#0B5ED7' : '#DC3545';

    Swal.fire({
      html: `
      <div style="display:flex;align-items:center;gap:15px;">
        <img src="${ev.foto ?? 'assets/img/perfil/user-sin-foto.png'}"
             style="width:75px;height:75px;border-radius:50%;object-fit:cover;border:3px solid ${color};">

        <div style="text-align:left">
          <h3 style="margin:0">${ev.nombre}</h3>
          <p style="margin:0;font-size:14px;color:#444;">
            ${ev.tipo === 'entrada' ? ' Entró' : ' Salió'} — ${hora}
          </p>
        </div>
      </div>
    `,
      background: '#fff',
      showConfirmButton: false,
      timer: 2000,
      width: 350
    });
  }

}

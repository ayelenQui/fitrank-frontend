import { Component, OnInit , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatallaService } from '@app/api/services/batallas/batalla.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import gsap from 'gsap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle-batalla',
  templateUrl: './detalle-batalla.component.html',
  styleUrls: ['./detalle-batalla.component.css', '/../../css-socio/socio-common.css'],
  imports: [FormsModule,CommonModule]
})
export class DetalleBatallaComponent implements OnInit, AfterViewInit {

  @ViewChild('graficoPuntosCanvas', { static: false }) graficoCanvas!: ElementRef;
  batalla: any;
  cargando = true;
  oponente: string = "";
  grafico: any;
  batallaCargada: boolean = false;
  vistaCargada: boolean = false;
  graficoCreado: any;
  user = this.auth.obtenerUser();
  usuarioActualId = this.user?.id;



  constructor(
    private route: ActivatedRoute,
    private batallasService: BatallaService,
    private router: Router,
    private location: Location,
    private commonModule: CommonModule,
    private formsModule: FormsModule,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
        this.oponente = params['oponente'] || 'Desconocido';
    });

    this.batallasService.progreso(id).subscribe({
      next: (data) => {
        this.batalla = data;
        this.batalla.usuarioEsA = (this.usuarioActualId === data.UsuarioA);
        this.cargando = false;
        this.batallaCargada = true;
        this.intentarGraficar();
        this.usuarioActualId = this.user?.id;
        setTimeout(() => this.animarDetalle(), 50); // Espera a que Angular renderice
      },
      error: (e) => console.error(e)
    });
  }

  animarDetalle() {
  gsap.fromTo('.card-detalle', 
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
  );

  gsap.fromTo('.grafico-container', 
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' }
  );

  const btnFinalizar = document.querySelector('.btn-finalizar');
  btnFinalizar?.addEventListener('mouseenter', () => gsap.to(btnFinalizar, { scale: 1.1, duration: 0.1 }));
  btnFinalizar?.addEventListener('mouseleave', () => gsap.to(btnFinalizar, { scale: 1, duration: 0.1 }));
}

  ngAfterViewInit() {
    this.vistaCargada = true;
    this.intentarGraficar();

    // Animar título y subtítulo
    gsap.fromTo('.titulo', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    gsap.fromTo('.subtitulo', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power3.out' });

    // Animar card detalle
    gsap.fromTo('.card-detalle', 
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );

    // Animar gráfico
    gsap.fromTo('.grafico-container', 
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' }
    );

    // Botón finalizar
    const btnFinalizar = document.querySelector('.btn-finalizar');
    btnFinalizar?.addEventListener('mouseenter', () => gsap.to(btnFinalizar, { scale: 1.1, duration: 0.1 }));
    btnFinalizar?.addEventListener('mouseleave', () => gsap.to(btnFinalizar, { scale: 1, duration: 0.1 }));
 
}
ngAfterViewChecked() {
  this.intentarGraficar();
}

intentarGraficar() {
  if (this.graficoCreado) return; // evita loops infinitos
  if (!this.batallaCargada) return;
  if (!this.graficoCanvas) return;

  this.graficoCreado = true; 
  this.cargarGrafico();
}


 finalizarBatalla() {
  Swal.fire({
    title: "¿Finalizar batalla?",
    text: "¿Seguro que deseas finalizar esta batalla?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Finalizar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6"
  }).then((result) => {

    if (!result.isConfirmed) return;

    this.batallasService.finalizar(this.batalla.batallaId).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "¡Batalla finalizada!",
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          this.router.navigate(['/batalla/mis-batallas']);
        }, 1200);
      },
      error: (err) => {
        console.error("Error al finalizar batalla:", err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al finalizar la batalla.",
          confirmButtonColor: "#d33"
        });
      }
    });
  });
}


    volverAtras(): void {
    this.location.back();
  }

  diasRestantes(): number {
    if (!this.batalla || !this.batalla.fechaFin) return 0;

    const hoy = new Date();
    const fin = new Date(this.batalla.fechaFin);

    const diffMs = fin.getTime() - hoy.getTime();
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDias;
}

    cargarGrafico() {
        if (this.grafico) this.grafico.destroy();

        this.grafico = new Chart(this.graficoCanvas.nativeElement, {
            type: 'bar',
            data: {
            labels: ['Puntos A', 'Puntos B'],
            datasets: [{
                data: [this.batalla.puntosGuardadosA, this.batalla.puntosGuardadosB],
                backgroundColor: ['#e0d682', '#9b59b6'], // violetas
                        borderWidth: 2,
                        borderRadius: 15
            }]
            },
            options: {
            responsive: true,
            plugins: { legend: { display: false } }
            }
        });
    }

        
    
}

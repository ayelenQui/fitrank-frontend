import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GimnasioService } from '@app/api/services/gimnasio/gimnasio.service';

@Component({
  selector: 'app-config-gimnasio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-gimnasio.component.html',
  styleUrls: ['./configuracion-gimnasio.component.css']
})
export class ConfigGimnasioComponent implements OnInit {

  gimnasio: any = {
    colorPrincipal: '#8B52FF',
    colorSecundario: '#FAEB92',
    logoUrl: ''
  };

  defaultTheme = {
    colorPrincipal: '#000000',   // Sidebar negro base
    colorSecundario: '#8B52FF',  // Botones FitRank violeta
    logoUrl: ''                  // Sin logo por defecto
  };


  // Copia para restablecer
  valoresOriginales: any = {
    colorPrincipal: '#8B52FF',
    colorSecundario: '#FAEB92',
    logoUrl: ''
  };


  previewLogo: string | null = null;
  logoParaSubir: FormData | null = null;

  constructor(private gymService: GimnasioService) { }
 
  ngOnInit() {

    this.gymService.obtenerMiGimnasio().subscribe({

      next: (gym: any) => {
        this.gimnasio = gym;
        this.previewLogo = gym.logoUrl;

        // Guardamos la versión original del server
        this.valoresOriginales = { ...gym };

        // Aplicamos el theme actual
        this.aplicarTheme();
      },

      error: err => console.error("❌ Error al obtener datos del gimnasio", err)
    });

  }

  @ViewChild('previewIframe') previewIframe: any;

  modoPreview: 'mobile' | 'desktop' = 'desktop';

  actualizarIframeTheme() {
    if (!this.previewIframe) return;

    const iframeWin = this.previewIframe.nativeElement.contentWindow;

    iframeWin?.postMessage({
      colorPrincipal: this.gimnasio.colorPrincipal,
      colorSecundario: this.gimnasio.colorSecundario
    }, "*");
  }



  aplicarTheme() {
    const theme = {
      colorPrincipal: this.gimnasio.colorPrincipal,
      colorSecundario: this.gimnasio.colorSecundario,
      logoUrl: this.previewLogo
    };

    localStorage.setItem('gym-theme', JSON.stringify(theme));

    document.documentElement.style.setProperty('--color-principal', theme.colorPrincipal);
    document.documentElement.style.setProperty('--color-secundario', theme.colorSecundario);

    // 🔥 CALCULAR LUMINOSIDAD DEL COLOR SECUNDARIO
    const textColor = this.calcularTexto(theme.colorSecundario);
    document.documentElement.style.setProperty('--texto-secundario', textColor);

    if (theme.logoUrl) {
      document.documentElement.style.setProperty('--logo-gimnasio', `url('${theme.logoUrl}')`);
      this.actualizarIframeTheme();

    }
  }
  calcularTexto(hex: string): string {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);

    // Luminancia percibida
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);

    return luminancia > 150 ? '#000000' : '#FFFFFF';
  }


  onLogoSeleccionado(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewLogo = reader.result as string;
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append('file', file);
    this.logoParaSubir = fd;
  }

  guardar() {

    const dto = {
      Id: this.gimnasio.id ?? this.gimnasio.Id,
      ColorPrincipal: this.gimnasio.colorPrincipal,
      ColorSecundario: this.gimnasio.colorSecundario,
      LogoUrl: this.gimnasio.logoUrl
    };

    // Si hay logo nuevo: subir primero
    if (this.logoParaSubir) {
      this.gymService.subirLogo(this.logoParaSubir).subscribe({

        next: (res: any) => {
          this.gimnasio.logoUrl = res.url;
          this.previewLogo = res.url;

          localStorage.setItem('logoUrl', res.url);
          dto.LogoUrl = res.url;  // 🔥 importante

          // Después actualizar personalización
          this.actualizarPersonalizacionFinal(dto);
        },

        error: err => console.error("❌ Error al subir logo", err)
      });

    } else {
      // No hay logo → solo colores
      this.actualizarPersonalizacionFinal(dto);
    }
  }

  private actualizarPersonalizacionFinal(dto: any) {

    this.gymService.actualizarPersonalizacion(dto).subscribe({

      next: () => {
        console.log("✔ Configuración guardada");

        this.valoresOriginales = { ...this.gimnasio };

        this.aplicarTheme();
      },

      error: err => console.error("❌ Error al actualizar personalización", err)
    });
  }
  getTextoColor(hex: string): string {
    if (!hex) return '#000';

    // Quitar #
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Percepción luminosa
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);

    // Si es muy oscuro → texto blanco
    return luminancia < 140 ? '#fff' : '#000';
  }

  restablecer() {

    // 🔥 1. Borrar theme guardado
    localStorage.removeItem('gym-theme');

    // 🔥 2. Restaurar valores base de FitRank
    const defaultTheme = {
      colorPrincipal: '#000000',  // sidebar negro
      colorSecundario: '#8B52FF', // acciones violetas FitRank
      logoUrl: null
    };

    // Guardar nuevamente el theme base (opcional pero prolijo)
    localStorage.setItem('gym-theme', JSON.stringify(defaultTheme));

    // 🔥 3. Aplicar al DOM INMEDIATAMENTE
    document.documentElement.style.setProperty('--color-principal', defaultTheme.colorPrincipal);
    document.documentElement.style.setProperty('--color-secundario', defaultTheme.colorSecundario);
    document.documentElement.style.setProperty('--logo-gimnasio', 'none');

    // 🔥 4. Actualizar los valores en pantalla
    this.gimnasio.colorPrincipal = defaultTheme.colorPrincipal;
    this.gimnasio.colorSecundario = defaultTheme.colorSecundario;
    this.previewLogo = null;

    // 🔥 5. Mandarlo al backend (actualiza DB y SignalR)
    const dto = {
      Id: this.gimnasio.id ?? this.gimnasio.Id,
      ColorPrincipal: defaultTheme.colorPrincipal,
      ColorSecundario: defaultTheme.colorSecundario,
      LogoUrl: null
    };

    this.gymService.actualizarPersonalizacion(dto).subscribe({
      next: () => {
        console.log("🔄 Tema restablecido y enviado por SignalR");
        this.valoresOriginales = { ...this.gimnasio };
      },
      error: err => console.error("❌ Error al restablecer theme", err)
    });
  }


}

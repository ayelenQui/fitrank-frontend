import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-header-socio',
  templateUrl: './header-socio.component.html',
  styleUrls: ['./header-socio.component.css'],
  standalone: true,
})
export class HeaderSocioComponent implements OnInit {
  @Input() user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.user) {
      this.user = this.authService.obtenerUser();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]).catch((err) => console.error(err));
  }

  irAlHome(): void {
    this.router.navigate(['/home/home-socio']).catch((err) => console.error(err));
  }
}

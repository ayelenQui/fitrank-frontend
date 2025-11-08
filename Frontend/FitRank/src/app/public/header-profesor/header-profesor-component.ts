import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-header-profesor',
  templateUrl: './header-profesor.component.html',
  styleUrls: ['./header-profesor.component.css'],
  standalone: true,
})
export class HeaderProfesorComponent implements OnInit {
  @Input() user: any = null;
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.user) {
      this.user = this.authService.obtenerUser();
    }
  }

  toggleSidebar(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAlHome(): void {
    this.router.navigate(['/home/home-socio']); // o podés hacer /home/home-profesor si lo separás
  }

  irA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}

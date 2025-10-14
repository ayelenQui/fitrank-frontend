import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../api/services/activacion/AuthService.service';

@Component({
  selector: 'app-visitante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitante.component.html',
})
export class VisitanteComponent {
  constructor(private router: Router, private authService: AuthService) { }

  irLogin() {
    this.router.navigate(['/login']);
  }
}

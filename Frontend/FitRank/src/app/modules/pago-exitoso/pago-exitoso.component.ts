import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css'],
})
export class PagoExitosoComponent {
  constructor(private router: Router) { }

  volver() {
    this.router.navigate(['/admin']);
  }
}

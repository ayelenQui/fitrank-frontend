import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocioService, Socio } from '../../../../api/services/socio/socio.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, map, startWith, combineLatest } from 'rxjs';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {
  socios$!: Observable<Socio[]>;
  searchTerm: string = '';

  constructor(private socioService: SocioService, private router: Router) {}

  ngOnInit(): void {
    this.loadSocios();
  }

  loadSocios() {
    this.socios$ = combineLatest([
      this.socioService.getSocios(),
      // simulamos el término de búsqueda como stream
      new Observable<string>((observer) => {
        observer.next(this.searchTerm);
        observer.complete();
      }).pipe(startWith(''))
    ]).pipe(
      map(([socios]) =>
        socios.filter(s =>
          s.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
    );
  }

  onSearchChange() {
    this.loadSocios();
  }

  verDetalle(id: number) {
    this.router.navigate(['/homeAdmin/socios', id]);
  }
}

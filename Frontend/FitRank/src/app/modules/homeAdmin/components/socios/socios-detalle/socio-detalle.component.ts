import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SocioService, Socio } from '../../../../../api/services/socio/socio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-socio-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socio-detalle.component.html',

})
export class SocioDetalleComponent implements OnInit {
  socio$!: Observable<Socio | undefined>;
  activeTab: string = 'info';

  constructor(private route: ActivatedRoute, private socioService: SocioService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.socio$ = this.socioService.getSocioById(id);
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogroService } from '../../../../api/services/logro/logro.service';
import { LogroCrearRest } from '../../../../api/services/logro/interfaces/logro.crear.rest';

@Component({
selector: 'app-logros-crear',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './logros-crear-component.html',
})
export class LogrosCrearComponent {
private fb = inject(FormBuilder);
private router = inject(Router);
private logroService = inject(LogroService);


loading = signal(false);
serverError = signal<string | null>(null);


form = this.fb.group({
nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(400)]],
puntos: [10, [Validators.required, Validators.min(0), Validators.max(100000)]],
activo: [true]
});


get f() { return this.form.controls; }


async onSubmit() {
this.serverError.set(null);
if (this.form.invalid) {
this.form.markAllAsTouched();
return;
}


this.loading.set(true);
const payload = this.form.getRawValue() as LogroCrearRest;


this.logroService.crear(payload).subscribe({
next: _ => {
this.loading.set(false);
// Navega al listado o muestra toast
this.router.navigate(['/logros']);
},
error: (err) => {
this.loading.set(false);
const msg = err?.error?.message || err?.message || 'Error al crear el logro.';
this.serverError.set(msg);
}
});
}
}
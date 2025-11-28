export interface UsuarioIngresoDTO {
  id: number;
  nombre: string;
  apellido: string;
  fotoDePerfil?: string | null;
  cuotaPagadaHasta?: string | null;
  email?: string | null;
  telefono?: string | null;
}

export interface Ingreso {
  id: number;
  gimnasioId: number;
  usuarioId?: number;
  monto: number;
  metodoPago: string;
  fecha: string;
  observaciones?: string | null;
  confirmado: boolean;

  usuario?: UsuarioIngresoDTO | null;
}

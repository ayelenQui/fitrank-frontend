export interface Ingreso {
  id: number;
  gimnasioId: number;
  usuarioId?: number;
  monto: number;
  metodoPago: string;
  fecha: string;
  observaciones?: string;
  confirmado: boolean;
}

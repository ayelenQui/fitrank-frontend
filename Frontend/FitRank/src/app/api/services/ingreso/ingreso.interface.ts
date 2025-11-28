
export interface Ingreso {
  id: number;
  gimnasioId: number;
  usuarioId?: number;
  usuario?: {
    id: number;
    nombre: string;
    apellido: string;
    fotoUrl?: string | null;
    email?: string;
  };
  monto: number;
  metodoPago: string;
  fecha: string;
  observaciones?: string;
  confirmado: boolean;
}

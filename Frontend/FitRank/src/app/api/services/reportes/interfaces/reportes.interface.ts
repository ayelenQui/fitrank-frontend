export interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;   // ISO string desde el backend
  activo: boolean;
  usuarioId: number;
  gimnasioId: number;
}
export interface AgregarReporte {
  titulo: string;
  descripcion: string;
  usuarioId: number;
  gimnasioId: number;
}
export interface ActualizarReporte {
  id: number;
  titulo: string;
  descripcion: string;
}

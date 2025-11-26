import { BatallaEstado, BatallaTipo } from "./batalla.model";


export interface CrearBatallaDTO {
  socioAId: number;
  socioBId: number;
  tipo: BatallaTipo;
  diasDuracion: number;
}

export interface ProgresoBatallaDTO {
  batallaId: number;
  puntosJugadorA: number;
  puntosJugadorB: number;
  fechaInicio: string;
  fechaFin?: string | null;
  puntosGuardadosA: number;
  puntosGuardadosB: number;
  estado: BatallaEstado;
  ganadorId?: number | null;
  UsuarioA: number;
  UsuarioB: number;
}

export interface HistorialBatallaDTO {
  batallaId: number;
  UsuarioA: number;
  UsuarioB: number;
  oponente: string;
  estado: BatallaEstado; 
  puntosA: number;
  puntosB: number;
  fechaInicio: string;
  fechaFin?: string | null;
  usuarioEsA: boolean;
}
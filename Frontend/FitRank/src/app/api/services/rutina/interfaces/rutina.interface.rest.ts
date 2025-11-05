export interface AgregarRutinaDTO {
  nombre: string;
  tipoCreacion: string;
  descripcion: string | null;
  activa: boolean;
  socioId: number;
  usuarioId: number;
}

export interface RutinaDTO {
  id: number;
  nombre: string;
  TipoCreacion: string;
  FechaCreacion: Date;
  Descripcion: string | null;
  Activa: boolean;
  SocioId: number;
  UsuarioId: number;

}

export interface RutinaCompletaDTO {
  id: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
  sesiones: SesionDTO[];
}

export interface SesionDTO {
  id: number;
  nombre: string;
  numeroDeSesion: number;
  ejerciciosAsignados: EjercicioAsignadoDTO[];
}

export interface EjercicioAsignadoDTO {
  id: number;
  numeroEjercicio?: number;
  ejercicio: {
    id: number;
    nombre: string;
    descripcion: string;
    urlImagen?: string | null;
    urlVideo?: string | null;
    duracionEstimada: string;
  };
  series: SerieDTO[];
  completadoHoy?: boolean;
}

export interface SerieDTO {
  id: number;
  peso: number;
  repeticiones: number;
  duracion: string;
}


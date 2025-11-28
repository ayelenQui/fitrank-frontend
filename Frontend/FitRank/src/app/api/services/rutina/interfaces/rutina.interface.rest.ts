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
  fechaCreacion: Date;
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

// RUTINA IA:
export interface RutinaRequestDTO {
  edad: number;
  pesoKg: number;
  alturaCm: number;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  sesionesPorSemana: number;
  minutosPorSesion: number;
  objetivo: 'Hipertrofia' | 'PerdidaDePeso' | 'Fuerza' | 'Resistencia';
  calidadAlimentacion: number;
  horasSuenio: number;
  screening: ScreeningDTO;
  preferencias: PreferenciasDTO;
}

export interface ScreeningDTO {
  hipertension: boolean;
  hipertensionControlada: boolean;
  diabetes: boolean;
  cirugiaReciente: boolean;
  dolorLumbar: boolean;
  dolorHombro: boolean;
  dolorRodilla: boolean;
  dolorToracico: boolean;
  sincope: boolean;
  embarazo: boolean;
  frecuenciaCardiacaReposo: number;
  dolorEscala0a10: number;
}

export interface PreferenciasDTO {
  incluirCardio: boolean;
  prefiereMaquinas: boolean;
  prefiereMancuernas: boolean;
  ejerciciosExcluidos: string[];
}
export interface CrearSolicitudRutinaProfesorDTO {
  mensajeSocio?: string;
  nombreSocio: string;
  edad: number;
  pesoKg: number;
  alturaCm: number;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  sesionesPorSemana: number;
  minutosPorSesion: number;
  objetivo: 'Hipertrofia' | 'PerdidaDePeso' | 'Fuerza' | 'Resistencia';
  calidadAlimentacion: number; // 1-5
  horasSuenio: number;

  dolorLumbar: boolean;
  dolorRodilla: boolean;
  dolorHombro: boolean;
  cirugiaReciente: boolean;
  sincope: boolean;
  embarazo: boolean;
  hipertension: boolean;
  hipertensionControlada: boolean;
  diabetes: boolean;
  dolorToracico: boolean;
  frecuenciaCardiacaReposo: number;
}
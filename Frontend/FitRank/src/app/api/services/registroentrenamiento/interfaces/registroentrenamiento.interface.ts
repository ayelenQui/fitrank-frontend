export interface Ejercicio {
  Id: number;
  Nombre: string;
  GrupoMuscular: string;
}

export interface EjercicioRealizadoDTOEntrada {
  UsuarioId: number;
  EjercicioId: number;
  Series: number;
  Repeticiones: number;
  Peso: number;
  TipoEntrenamiento: string;
  Observacion: string;
  fecha?: string; 
}

export interface EjercicioRealizadoDTOSalida {
  Id: number;
  UsuarioId: number;
  EjercicioId: number;
  NombreEjercicio: string;
  GrupoMuscular: string;
  Series: number;
  Repeticiones: number;
  Peso: number;
  PuntosObtenidos: number; 
  FechaRegistro: Date;
  Observacion: string;
}

export interface AgregarEntrenamientoDTO {
  id?: Date;
  fecha: Date; 
  duracion: string; 
  socioId: number;
}

export interface EntrenamientoDTO {
  id: number;
  fecha: Date;
  duracion: string;
  socioId: number;
}

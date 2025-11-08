export interface ProfesorDTO {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  nombreUsuario: string;
  email: string;
  telefono: string;
  sexo: string;
  fechaNacimiento: string;
  fotoDePerfil: string;
  estado: string;
  esActivado: boolean;
  matricula: string;
  sueldo: number;
  gimnasioId?: number;
  gimnasioNombre?: string;
}
export interface ActualizarProfesorDTO {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono?: string;
  sexo: string;
  fechaNacimiento: string;
  matricula: string;
  sueldo: number;
  estado?: string;
  esActivado: boolean;
  gimnasioId?: number;
}
export interface AgregarProfesorDTO {
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono?: string;
  sexo: string;
  fechaNacimiento: string; // o Date si lo parseás
  matricula: string;
  sueldo: number;
  password: string;
  gimnasioId?: number;
}

export interface RutinaProfesorDTO {
  id: number;
  nombre: string;
  descripcion?: string;
  activa: boolean;
  fechaCreacion: string; // ISO string desde .NET
  socioNombre?: string;
  tipo?: string;
}

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


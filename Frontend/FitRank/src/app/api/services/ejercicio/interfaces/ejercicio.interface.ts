// DTO que se usa para crear un ejercicio (POST)
export interface AgregarEjercicioDTO {
  nombre: string;
  urlVideo: string;
  grupoMuscularId: number;
}

// DTO que devuelve el backend (GET)
export interface EjercicioDTO {
  id: number;
  nombre: string;
  urlVideo: string;
  grupoMuscularId: number;
}

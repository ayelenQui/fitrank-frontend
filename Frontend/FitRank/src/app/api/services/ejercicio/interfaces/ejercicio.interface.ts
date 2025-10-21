export interface EjercicioDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  urlVideo?: string | null;
  /** @format int64 */
  grupoMuscularId?: number;
}

export interface AgregarEjercicioDTO {
  nombre?: string | null;
  urlVideo?: string | null;
  /** @format int64 */
  grupoMuscularId?: number;
}
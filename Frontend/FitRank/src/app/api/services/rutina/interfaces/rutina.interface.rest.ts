
export interface AgregarRutinaDTO {
  nombre?: string | null;
  /** @format int32 */
  frecuencia?: number | null;
  /** @format int64 */
  dificultadId?: number;
}

export interface EditarRutinaDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  /** @format int32 */
  frecuencia?: number | null;
  /** @format int64 */
  dificultadId?: number;
}

export interface RutinaDTO {
  id: number;
  nombre: string;
  dificultadId?: number;
  frecuencia?: number;
}

export interface ActualizarEjercicioAsignadoDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  orden?: number;
  observaciones?: string | null;
  /** @format int32 */
  sesion?: number;
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
}

export interface AgregarEjercicioAsignadoDTO {
  /** @format int32 */
  orden?: number;
  observaciones?: string | null;
  /** @format int32 */
  sesion?: number;
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
}

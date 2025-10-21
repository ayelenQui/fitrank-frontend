export interface AgregarSerieAsignadaDTO {
  /** @format int32 */
  peso?: number;
  /** @format int32 */
  repeticiones?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  nroSerie?: number;
  /** @format int64 */
  ejercicioAsignadoId?: number;
}

export interface ActualizarSerieAsignadaDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  peso?: number;
  /** @format int32 */
  repeticiones?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  nroSerie?: number;
  /** @format int64 */
  ejercicioAsignadoId?: number;
}
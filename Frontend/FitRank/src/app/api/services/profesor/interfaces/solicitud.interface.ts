export interface Solicitud {
  id: number;
  socioId: number;
  nombreSocio: string;
  edad: number;
  pesoKg: number;
  alturaCm: number;
  nivel: string;
  sesionesPorSemana: number;
  minutosPorSesion: number;
  objetivo: string;
  estado: string;
  fechaSolicitud: string;

  //Screening
  DolorHombro: boolean;
  DolorRodilla: boolean;
  DolorLumbar: boolean;
  CirugiaReciente: boolean;
  Sincope: boolean;
  Embarazo: boolean;
  Hipertension: boolean;
  HipertensionControlada: boolean;
  Diabetes: boolean;
  DolorToracico: boolean;
  FrecuenciaCardiacaReposo: number;
}
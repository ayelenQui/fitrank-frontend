export interface Solicitud {
  id: number;
  socioId: number;
  nombreSocio: string;
  profesorId?: number;
  estado: string;
  fechaSolicitud: string;
  mensajeSocio?: string;

  edad: number;
  pesoKg: number;
  alturaCm: number;
  nivel: string;
  sesionesPorSemana: number;
  minutosPorSesion: number;
  objetivo: string;

  // Screening
  dolorLumbar: boolean;
  dolorRodilla: boolean;
  dolorHombro: boolean;
  cirugiaReciente: boolean;
  sincope: boolean;
  embarazo: boolean;
  hipertension: boolean;
  hipertensionControlada: boolean;
  diabetes: boolean;
  dolorToracico: boolean;
  frecuenciaCardiacaReposo: number;
}


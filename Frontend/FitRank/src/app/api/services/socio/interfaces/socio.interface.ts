export interface Socio {
  id?: number;
  nombre: string;                    
  apellido: string;                  
  dni: number;                       
  nombreUsuario: string;
  email?: string;                    
  telefono?: string;                 
  sexo: string;
  cuotaPagadaHasta: string;          
  fotoUrl: string;                   
  gimnasioId: number;
  gimnasioNombre: string | null;     
  fechaRegistro: string;
  altura: number;
  peso: number;
  nivel: string;
  puntaje: number; 
  participaEnRanking: boolean;                  
}

export interface SocioDTO {
  id: number;
  nombre: string;
  apellido: string;
  nivel: string;
  fotoUrl?: string | null;
  cuotaPagadaHasta?: string | null;
  fechaRegistro?: string | null;
  gimnasioNombre?: string | null;
  gimnasioId?: number;
  altura?: number;
  peso?: number;
  puntaje?: number;
  dni?: number;
  nombreUsuario?: string;
  sexo?: string;
  qrToken?: string;
}
export interface CreateSocioRequest {
  nombre: string;                    
  apellido: string;                  
  dni: number;                       
  nombreUsuario: string;
  email: string;
  password: string;
  telefono?: string;                 
  sexo: string;
  fotoUrl?: string;                  
  gimnasioId: number;
  fechaRegistro: string;
  altura: number;
  peso: number;
  nivel: string;
}

export interface UpdateSocioRequest {
  id: number;
  nombre?: string;                   
  apellido?: string;                 
  dni?: number;                      
  nombreUsuario?: string;
  email?: string;
  password?: string;
  telefono?: string;
  sexo?: string;
  fotoUrl?: string;                  
  gimnasioId?: number;
  fechaRegistro?: string;
  altura?: number;
  peso?: number;
  nivel?: string;
  puntaje?: number;                  
  qrToken?: string;                  
}

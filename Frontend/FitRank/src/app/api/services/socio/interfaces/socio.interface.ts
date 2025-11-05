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
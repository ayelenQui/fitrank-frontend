import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeThumbnailService {

  constructor() { }

  /**
   * Extrae el ID de un video de YouTube desde diferentes formatos de URL
   * @param url - URL del video de YouTube
   * @returns ID del video o null si no se encuentra
   */
  extractVideoId(url: string): string | null {
    if (!url) return null;

    // Formato: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];

    // Formato: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];

    // Formato: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];

    // Formato: https://www.youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
    if (shortsMatch) return shortsMatch[1];

    return null;
  }

  /**
   * Obtiene la URL de la miniatura de un video de YouTube
   * @param url - URL del video de YouTube
   * @param quality - Calidad de la miniatura (default, mqdefault, hqdefault, sddefault, maxresdefault)
   * @returns URL de la miniatura o una imagen placeholder
   */
  getThumbnailUrl(url: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
    const videoId = this.extractVideoId(url);
    
    if (!videoId) {
      // Retorna una imagen placeholder si no se puede extraer el ID
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360"%3E%3Crect fill="%239333ea" width="480" height="360"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EVideo%3C/text%3E%3C/svg%3E';
    }

    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }

  /**
   * Convierte una URL de YouTube a formato embed
   * @param url - URL del video de YouTube
   * @returns URL en formato embed
   */
  getEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    
    if (!videoId) return url;

    return `https://www.youtube.com/embed/${videoId}`;
  }
}

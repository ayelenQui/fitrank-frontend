import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ===============
// 1) CARGAR TEMA DESDE LOCALSTORAGE
// ===============
const themeStr = localStorage.getItem('gym-theme');

if (themeStr) {
  const theme = JSON.parse(themeStr);

  // Sidebar
  document.documentElement.style.setProperty('--color-principal',
    theme.colorPrincipal ?? '#000000'
  );

  // Botones / acciones
  document.documentElement.style.setProperty('--color-secundario',
    theme.colorSecundario ?? '#8B52FF'
  );

  // Logo
  if (theme.logoUrl) {
    document.documentElement.style.setProperty('--logo-gimnasio', `url('${theme.logoUrl}')`);
  }

} else {
  // ===============
  // 2) Fallback cuando NO hay theme cargado
  // ===============
  document.documentElement.style.setProperty('--color-principal', '#000000'); // sidebar base
  document.documentElement.style.setProperty('--color-secundario', '#8B52FF'); // botones base
  document.documentElement.style.setProperty('--logo-gimnasio', 'none');
}

// ==========================
// 3) Bootstrap Angular App
// ==========================
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

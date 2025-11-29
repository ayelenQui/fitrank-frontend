import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


const themeStr = localStorage.getItem('gym-theme');

if (themeStr) {
  const theme = JSON.parse(themeStr);


  document.documentElement.style.setProperty('--color-principal',
    theme.colorPrincipal ?? '#000000'
  );


  document.documentElement.style.setProperty('--color-secundario',
    theme.colorSecundario ?? '#8B52FF'
  );


  if (theme.logoUrl) {
    document.documentElement.style.setProperty('--logo-gimnasio', `url('${theme.logoUrl}')`);
  }

} else {
  document.documentElement.style.setProperty('--color-principal', '#000000'); // sidebar base
  document.documentElement.style.setProperty('--color-secundario', '#8B52FF'); // botones base
  document.documentElement.style.setProperty('--logo-gimnasio', 'none');
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

import { HttpInterceptorFn } from '@angular/common/http';

export const ThemeInterceptor: HttpInterceptorFn = (req, next) => {

  const themeStr = localStorage.getItem('gym-theme');

  if (themeStr) {
    const theme = JSON.parse(themeStr);

    if (theme.colorPrincipal) {
      document.documentElement.style.setProperty('--color-principal', theme.colorPrincipal);
    }

    if (theme.colorSecundario) {
      document.documentElement.style.setProperty('--color-secundario', theme.colorSecundario);
    }

    if (theme.logoUrl) {
      document.documentElement.style.setProperty('--logo-gimnasio', `url('${theme.logoUrl}')`);
    }
  }

  return next(req);
};

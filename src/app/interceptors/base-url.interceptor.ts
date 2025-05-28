import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const server = "http://localhost:8080"; // Pon la url del servidor aquí
  const reqClone = req.clone({
    url: `${server}/${req.url}`,
  });
  return next(reqClone);
};
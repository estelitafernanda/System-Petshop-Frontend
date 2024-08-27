import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adiciona o header de autorização, por exemplo
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.getToken()}`)
    });

    return next.handle(authReq);
  }

  private getToken(): string {
    // Lógica para obter o token de autenticação
    return localStorage.getItem('token') || '';
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);

  private API = "http://localhost:8080/usuario";

  constructor() { }

  listaAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(usuario: Usuario): Observable<string>{
    return this.http.post<string>(this.API+"/criar", usuario, {responseType: 'text' as 'json'});
  }

  update(usuario:  Usuario, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,  usuario, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable< Usuario>{
    return this.http.get< Usuario>(this.API+"/findById/"+id);
  }

}


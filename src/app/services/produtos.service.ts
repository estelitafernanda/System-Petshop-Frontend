import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/produto";

  constructor() { }

  listaAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(produto: Produto): Observable<string>{
    return this.http.post<string>(this.API+"/criar", produto, {responseType: 'text' as 'json'});
  }

  update(produto:  Produto, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id,  produto, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable< Produto>{
    return this.http.get< Produto>(this.API+"/findById/"+id);
  }

}


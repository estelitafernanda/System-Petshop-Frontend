import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  http = inject(HttpClient);

  API = "http://localhost:8080/animal";

  constructor() { }

  listaAll(): Observable<Animal[]>{
    return this.http.get<Animal[]>(this.API+"/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(animal: Animal): Observable<string>{
    return this.http.post<string>(this.API+"/criar", animal, {responseType: 'text' as 'json'});
  }

  update(animal: Animal, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, animal, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Animal>{
    return this.http.get<Animal>(this.API+"/findById/"+id);
  }

}


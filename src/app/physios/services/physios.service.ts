import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Physio } from '../interfaces/physio';
import { PhysiosResponse, SinglePhysioResponse } from 'src/app/patients/interfaces/responses';


@Injectable({
  providedIn: 'root'
})
export class PhysiosService {
  #http = inject(HttpClient);

  getPhysios(): Observable<Physio[]> {
    return this.#http
      .get<PhysiosResponse>('physios')
      .pipe(map((resp) => resp.result));
  }

  getPhysio(id: string): Observable<Physio> {
    return this.#http
      .get<SinglePhysioResponse>(`physios/${id}`)
      .pipe(map((resp) => resp.result));
  }

  addPhysio(physio: Physio): Observable<Physio> {
    return this.#http
      .post<SinglePhysioResponse>('physios', physio)
      .pipe(map((resp) => resp.result));
  }

  updatePhysio(id: string, physio: Physio): Observable<Physio> {
    return this.#http
      .put<SinglePhysioResponse>(`physios/${id}`, physio)
      .pipe(map((resp) => resp.result));
  }

  deletePhysio(id: string): Observable<void> {
    return this.#http.delete<void>(`physios/${id}`);
  }
}

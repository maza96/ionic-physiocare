import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  Observable,
  catchError,
  firstValueFrom,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import { User } from '../interfaces/user';
import { TokenResponse, UserResponse } from '../interfaces/responses';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient);

  get logged() {
    return this.#logged.asReadonly();
  }

  async login(
    login: string,
    password: string
  ): Promise<void> {
    const resp = await firstValueFrom(
      this.#http.post<TokenResponse>('auth/login', {
        login,
        password
      })
    );
    try {
      await Preferences.set({ key: 'fs-token', value: resp.token });
      console.log('Token recibido en login:', resp.token);
      this.#logged.set(true);
    } catch (e) {
      throw new Error("Can't save authentication token in storage!");
    }
  }

  register(user: User): Observable<void> {
    return this.#http.post<void>('auth/register', user);
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    this.#logged.set(false);
  }

  async isLogged(): Promise<boolean> {
    if (this.#logged()) {
      // Estamos logueados
      return true;
    }

    const token = await Preferences.get({ key: 'fs-token' });
    if (!token.value) {
      // No hay token
      return false;
    }

    return firstValueFrom(this.#http.get('auth/validate').pipe(
      map(() => {
        this.#logged.set(true);
        return true; // Todo correcto
      }),
      catchError(() => of(false)) // Token no válido
    ));
  }

  getProfile(): Observable<User> {
    return this.#http
      .get<UserResponse>('auth/profile')
      .pipe(map((r) => r.user));
  }
}

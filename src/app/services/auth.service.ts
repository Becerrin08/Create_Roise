import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com';

  // Login contra Fake Store API
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Registro contra Fake Store API
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // Encriptar contraseña en SHA-256 
  async generarHash(texto: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Guardar usuario nuevo localmente para poder iniciar sesión con él
  async guardarUsuarioLocal(usuario: { username: string; email: string; passwordHash: string; nombre: string }) {
    const { value } = await Preferences.get({ key: 'usuarios_locales' });
    const usuarios = value ? JSON.parse(value) : [];
    usuarios.push(usuario);
    await Preferences.set({ key: 'usuarios_locales', value: JSON.stringify(usuarios) });
  }

  // Validar usuario local si no existe en Fake Store API
  async validarUsuarioLocal(identificador: string, passwordPlain: string): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'usuarios_locales' });
    if (!value) return false;

    const usuarios = JSON.parse(value);
    const hashIngresado = await this.generarHash(passwordPlain);

    return usuarios.some(
      (u: any) =>
        (u.username === identificador || u.email === identificador) &&
        u.passwordHash === hashIngresado
    );
  }

  async guardarToken(token: string): Promise<void> {
    await Preferences.set({ key: 'user_token', value: token });
  }

  async obtenerToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'user_token' });
    return value;
  }
  
  async guardarUsuarioActivo(nombre: string): Promise<void> {
    await Preferences.set({ key: 'usuario_activo', value: nombre });
  }

  async obtenerUsuarioActivo(): Promise<string> {
    const { value } = await Preferences.get({ key: 'usuario_activo' });
    return value || '';
  }
}
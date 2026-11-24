import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonGrid, IonRow, IonCol, IonText, IonCard, IonCardContent,
  IonIcon, IonItem, IonLabel, IonInput, IonButton, ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, chevronBackOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule, IonContent, IonGrid, IonRow, IonCol,
    IonText, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonInput, IonButton
  ]
})



export class IniciarSesionPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);


  loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  constructor() {
    addIcons({ image, chevronBackOutline });
  }
  ionViewWillEnter() {
    this.loginForm.reset();
  }



  async iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.mostrarMensaje('Por favor ingresa un usuario/correo y contraseña válidos.', 'warning');
      return;
    }

    //EyL
    const { correo, password } = this.loginForm.value;
    const identificador = correo.trim();


//api
    this.authService.login({ username: identificador, password }).subscribe({
      next: async (res) => {
        await this.authService.guardarToken(res.token);
        await this.authService.guardarUsuarioActivo(identificador);
        await this.mostrarMensaje('¡Inicio de sesión exitoso!', 'success');
        this.router.navigate(['/tabs/inicio']);
      },

      error: async () => {
        const esValidoLocal = await this.authService.validarUsuarioLocal(identificador, password);

        if (esValidoLocal) {
          await this.authService.guardarToken('local-token-' + Date.now());
          await this.authService.guardarUsuarioActivo(identificador);
          await this.mostrarMensaje('¡Inicio de sesión exitoso!', 'success');
          this.router.navigate(['/tabs/inicio']);
        } else {
          this.mostrarMensaje('Usuario o contraseña incorrectos.', 'danger');
        }
      }
    });
  }


  private async mostrarMensaje(mensaje: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
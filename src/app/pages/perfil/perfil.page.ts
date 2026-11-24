import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonAvatar,
  IonIcon,
  IonButton,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonAvatar,
    IonIcon,
    IonButton
  ]
})
export class PerfilPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  nombreUsuario: string = '';
  constructor() {
    addIcons({ person });
  }

  async ionViewWillEnter() {
    this.nombreUsuario = await this.authService.obtenerUsuarioActivo();
  }

  async cerrarSesion() {
    // Limpiamos los datos de sesión activa en preferences
    await Preferences.remove({ key: 'user_token' });
    await Preferences.remove({ key: 'usuario_activo' });

    const toast = await this.toastCtrl.create({
      message: 'Sesión cerrada correctamente.',
      duration: 1000,
      position: 'top',
      color: 'medium'
    });
    await toast.present();

    this.router.navigate(['/home']);
  }
}
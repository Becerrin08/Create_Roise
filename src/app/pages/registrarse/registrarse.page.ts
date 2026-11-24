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
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule, IonContent, IonGrid, IonRow, IonCol,
    IonText, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonInput, IonButton
  ]
})


export class RegistrarsePage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);



  registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  constructor() {
    addIcons({ image, chevronBackOutline });
  }



  ionViewWillEnter() {
    this.registroForm.reset();
  }



  async registrar() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.mostrarMensaje('Por favor llena todos los campos correctamente (contraseña mín. 6 caracteres).', 'warning');
      return;
    }

    //EyL
    const { nombre, correo, password } = this.registroForm.value;
    const username = correo.trim().split('@')[0];

    const passwordHash = await this.authService.generarHash(password);
    

    // Objeto
    const userData = {
      email: correo.trim(),
      username: username,
      password: passwordHash
    };


    //api
    this.authService.register(userData).subscribe({
      next: async (res) => {
        console.log('Respuesta Fake Store API:', res);


        //G U L
        await this.authService.guardarUsuarioLocal({
          username,
          email: correo.trim(),
          passwordHash,
          nombre: nombre.trim()
        });


        await this.authService.guardarToken('local-token-' + Date.now());
        await this.authService.guardarUsuarioActivo(nombre.trim());



        await this.mostrarMensaje(`¡Bienvenido, ${nombre}! Registro exitoso.`, 'success');
        this.router.navigate(['/tabs/inicio']);
        


      },
      error: (err) => {
        console.error(err);
        this.mostrarMensaje('Error al registrar el usuario en el servidor.', 'danger');
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

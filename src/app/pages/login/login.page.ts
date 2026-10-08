import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon 
} from '@ionic/angular'; // <-- Cambiado aquí
import { addIcons } from 'ionicons';
import { imageOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    RouterLink
  ]
})
export class LoginPage {
  constructor() {
    addIcons({ imageOutline });
  }
}
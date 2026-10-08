import { Component } from '@angular/core';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonButton, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { imageOutline, ellipseOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonButton, 
    IonIcon
  ]
})
export class HomePage {
  constructor() {
    // Registramos los íconos de Ionicons
    addIcons({ imageOutline, ellipseOutline });
  }
}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class RegistrarsePage {
  constructor() {
    addIcons({ image, chevronBackOutline });
  }
}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonButton
  ]
})
export class CarritoPage {
  constructor() {
    addIcons({ image, arrowBackCircleOutline });
  }
}
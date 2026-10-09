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
  IonTextarea, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
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
    IonTextarea, 
    IonButton
  ]
})
export class DetallePage {
  constructor() {
    addIcons({ image, arrowBackCircleOutline });
  }
}
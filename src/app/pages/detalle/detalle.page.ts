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
  IonTextarea, 
  IonButton, 
  IonFooter, 
  IonToolbar, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  arrowBackCircleOutline, 
  imageOutline, 
  homeOutline, 
  listOutline, 
  cartOutline, 
  squareOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonItem, 
    IonTextarea, 
    IonButton, 
    IonFooter, 
    IonToolbar, 
    IonIcon,
    RouterLink
  ]
})
export class DetallePage {
  constructor() {
    addIcons({ 
      arrowBackCircleOutline, 
      imageOutline, 
      homeOutline, 
      listOutline, 
      cartOutline, 
      squareOutline, 
      personCircleOutline 
    });
  }
}
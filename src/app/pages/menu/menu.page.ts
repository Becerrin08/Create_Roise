import { Component } from '@angular/core';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonCard, 
  IonBadge, 
  IonButton, 
  IonFooter, 
  IonToolbar, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  imageOutline, 
  addOutline, 
  homeOutline, 
  listOutline, 
  cartOutline, 
  squareOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonCard, 
    IonBadge, 
    IonButton, 
    IonFooter, 
    IonToolbar, 
    IonIcon
  ]
})
export class MenuPage {
  constructor() {
    addIcons({ 
      imageOutline, 
      addOutline, 
      homeOutline, 
      listOutline, 
      cartOutline, 
      squareOutline, 
      personCircleOutline 
    });
  }
}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonButton, 
  IonFooter, 
  IonToolbar, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  listOutline, 
  cartOutline, 
  squareOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonButton, 
    IonFooter, 
    IonToolbar, 
    IonIcon,
    RouterLink
  ]
})
export class OrdersPage {
  constructor() {
    addIcons({ 
      homeOutline, 
      listOutline, 
      cartOutline, 
      squareOutline, 
      personCircleOutline 
    });
  }
}
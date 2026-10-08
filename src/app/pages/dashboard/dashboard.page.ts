import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonBadge, 
  IonButton, 
  IonFooter, 
  IonToolbar, 
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  imageOutline, 
  homeOutline, 
  listOutline, 
  cartOutline, 
  squareOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonBadge, 
    IonButton, 
    IonFooter, 
    IonToolbar, 
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    RouterLink
  ]
})
export class DashboardPage {
  constructor() {
    addIcons({ 
      imageOutline, 
      homeOutline, 
      listOutline, 
      cartOutline, 
      squareOutline, 
      personCircleOutline 
    });
  }
}
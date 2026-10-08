import { Component } from '@angular/core';
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
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
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
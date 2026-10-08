import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonBadge, 
  IonButton, 
  IonFooter, 
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonBadge, 
    IonButton, 
    IonFooter, 
    IonIcon, 
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    RouterLink
  ]
})
export class HomePage {
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
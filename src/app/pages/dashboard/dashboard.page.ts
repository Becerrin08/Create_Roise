import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonButton, 
  IonFooter, 
  IonIcon 
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
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCard,
    IonButton,
    IonFooter,
    IonIcon
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
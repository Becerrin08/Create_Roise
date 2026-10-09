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
  IonBadge, 
  IonButton,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, home, listOutline, cartOutline, squareOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
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
    IonBadge,
    IonButton,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel
  ]
})
export class InicioPage {
  constructor() {
    addIcons({ image, home, listOutline, cartOutline, squareOutline, personCircleOutline });
  }
}
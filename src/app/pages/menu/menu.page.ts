import { Component } from '@angular/core';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonIcon, 
  IonBadge, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, addOutline, fastFoodOutline, flameOutline, pintOutline, beerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonIcon, 
    IonBadge, 
    IonButton
  ]
})
export class MenuPage {
  constructor() {
    addIcons({ image, addOutline, fastFoodOutline, flameOutline, pintOutline, beerOutline });
  }
}
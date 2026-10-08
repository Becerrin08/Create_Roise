import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonCard, 
  IonButton, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { imageOutline, ellipseOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonCard, 
    IonButton, 
    IonIcon,
    RouterLink
  ]
})
export class HomePage {
  constructor() {
    addIcons({ imageOutline, ellipseOutline });
  }
}
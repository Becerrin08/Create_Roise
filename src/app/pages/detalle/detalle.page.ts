import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonText, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonFooter, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  imageOutline, 
  addOutline, 
  removeOutline, 
  homeOutline, 
  listOutline, 
  cartOutline, 
  squareOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonCard, 
    IonText, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonFooter, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonIcon
  ]
})
export class DetallePage {
  cantidad: number = 1;

  constructor() {
    addIcons({
      imageOutline,
      addOutline,
      removeOutline,
      homeOutline,
      listOutline,
      cartOutline,
      squareOutline,
      personCircleOutline
    });
  }

  incrementar() {
    this.cantidad++;
  }

  decrementar() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
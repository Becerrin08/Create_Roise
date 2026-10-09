import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-datos-entrega',
  templateUrl: './datos-entrega.page.html',
  styleUrls: ['./datos-entrega.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton
  ]
})
export class DatosEntregaPage {
  metodoPago: 'tarjeta' | 'efectivo' = 'tarjeta';

  constructor() {
    addIcons({ arrowBackCircleOutline });
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'efectivo') {
    this.metodoPago = metodo;
  }
}
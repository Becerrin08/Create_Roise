import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonList, 
  IonCard, 
  IonCardContent, 
  IonRadioGroup, 
  IonRadio,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFooter,
  IonIcon
} from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
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
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonList, 
    IonCard, 
    IonCardContent, 
    IonRadioGroup, 
    IonRadio,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonFooter,
    IonIcon
  ]
})
export class CheckoutPage {
  metodoPago: string = 'efectivo';

  constructor(private router: Router) {}

  seleccionarMetodo(metodo: string) {
    this.metodoPago = metodo;
  }

  confirmarPedido() {
    console.log('Pedido confirmado con método:', this.metodoPago);
    // Redirige al menú principal (o '/dashboard')
    this.router.navigate(['/menu']);
  }
}
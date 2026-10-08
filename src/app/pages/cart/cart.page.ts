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
  IonButton, 
  IonIcon, 
  IonFooter, 
  IonCard, 
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, addOutline, removeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
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
    IonButton, 
    IonIcon, 
    IonFooter, 
    IonCard, 
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  ]
})
export class CartPage {
  cantidad: number = 1;
  precioUnitario: number = 250;

  constructor(private router: Router) {
    addIcons({ trashOutline, addOutline, removeOutline });
  }

  incrementarItem() {
    this.cantidad++;
  }

  decrementarItem() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  calcularTotal(): number {
    return this.cantidad * this.precioUnitario;
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, arrowBackCircleOutline } from 'ionicons/icons';
import { DatosService } from '../../services/datos';
import { Producto } from '../../../estructuras/modelos';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    CommonModule
  ]
})
export class DetallePage {
  private datosService = inject(DatosService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  producto: Producto | null = null;
  cantidad: number = 1;
  notas: string = '';

  constructor() {
    addIcons({ image, arrowBackCircleOutline });
  }

  ionViewWillEnter() {
    const seleccionado = this.datosService.getProductoSeleccionado();
    this.producto = seleccionado || this.datosService.getCatalogoLocal()[0];
    this.cantidad = 1;
    this.notas = '';
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  aumentarCantidad() {
    if (this.cantidad < 20) {
      this.cantidad++;
    }
  }

  async agregarAlCarrito() {
    if (!this.producto) return;

    // Se incluye la imagen del producto para que se muestre en el carrito
    await this.datosService.agregarAlCarrito({
      producto: this.producto,
      cantidad: this.cantidad,
      notas: this.notas.trim()
    });

    const toast = await this.toastCtrl.create({
      message: `Agregado: ${this.cantidad}x ${this.producto.nombre}`,
      duration: 1800,
      position: 'top',
      color: 'success'
    });
    await toast.present();

    this.router.navigate(['/tabs/carrito']);
  }
}
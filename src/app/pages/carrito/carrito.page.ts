import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  IonItem,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, arrowBackCircleOutline } from 'ionicons/icons';
import { DatosService } from '../../services/datos';
import { ItemCarrito } from '../../../estructuras/modelos';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonItem,
    IonLabel
  ]
})
export class CarritoPage implements OnInit {
  private datosService = inject(DatosService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  itemsCarrito: ItemCarrito[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor() {
    addIcons({ image, arrowBackCircleOutline });
  }

  ngOnInit() {
    this.datosService.carrito$.subscribe((items) => {
      this.itemsCarrito = items;
      this.recalcularTotales();
      this.cdr.detectChanges();
    });
  }

  async ionViewWillEnter() {
    this.itemsCarrito = await this.datosService.obtenerCarritoAsync();
    this.recalcularTotales();
    this.cdr.detectChanges();
  }

  recalcularTotales() {
    const totales = this.datosService.calcularTotalesCarrito();
    this.subtotal = totales.subtotal;
    this.iva = totales.iva;
    this.total = totales.total;
  }

  async aumentar(index: number) {
    this.itemsCarrito[index].cantidad++;
    await this.datosService.guardarCarrito(this.itemsCarrito);
    this.recalcularTotales();
    this.cdr.detectChanges();
  }

  async disminuir(index: number) {
    if (this.itemsCarrito[index].cantidad > 1) {
      this.itemsCarrito[index].cantidad--;
    } else {
      this.itemsCarrito.splice(index, 1);
    }
    await this.datosService.guardarCarrito(this.itemsCarrito);
    this.recalcularTotales();
    this.cdr.detectChanges();
  }

  continuarEntrega() {
    if (this.total <= 0) {
      console.warn("El carrito está vacío, no se puede proceder al pago.");
      return;
    }

    console.log("Procediendo al pago con total de:", this.total);
    this.router.navigate(['/tabs/datos-entrega']);
  }
}
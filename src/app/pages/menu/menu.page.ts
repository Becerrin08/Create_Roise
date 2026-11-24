import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { DatosService } from '../../services/datos';
import { Producto } from '../../../estructuras/modelos';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
export class MenuPage implements OnInit {
  private datosService = inject(DatosService);
  private router = inject(Router);

  productos: Producto[] = [];

  constructor() {
    addIcons({ image, addOutline, fastFoodOutline, flameOutline, pintOutline, beerOutline });
  }

  ngOnInit() {
    this.productos = this.datosService.getCatalogoLocal();
  }

  ionViewWillEnter() {
    this.productos = this.datosService.getCatalogoLocal();
  }

  obtenerIconoCategoria(producto: Producto): string {
    if (producto.categoria === 'Hamburguesas') return 'fast-food-outline';
    if (producto.categoria === 'Alitas') return 'flame-outline';
    if (producto.nombre.toLowerCase().includes('cerveza')) return 'beer-outline';
    return 'pint-outline';
  }

  // Esta función guarda el producto y te manda a la pantalla de Detalle
  seleccionarProducto(producto: Producto) {
    this.datosService.setProductoSeleccionado(producto);
    this.router.navigate(['/tabs/detalle']);
  }
}
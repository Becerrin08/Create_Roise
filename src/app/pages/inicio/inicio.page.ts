import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { image, home, listOutline, cartOutline, squareOutline, personCircleOutline } from 'ionicons/icons';
import { DatosService } from '../../services/datos';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../../estructuras/modelos';

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
    IonButton
  ]
})
export class InicioPage {
  private datosService = inject(DatosService);
  private authService = inject(AuthService);
  private router = inject(Router);

  nombreUsuario: string = '';
  hamburguesas: Producto[] = [];
  alitas: Producto[] = [];

  constructor() {
    addIcons({ image, home, listOutline, cartOutline, squareOutline, personCircleOutline });
  }

  async ionViewWillEnter() {
    this.nombreUsuario = await this.authService.obtenerUsuarioActivo();
    const catalogo = this.datosService.getCatalogoLocal();
    this.hamburguesas = catalogo.filter(p => p.categoria === 'Hamburguesas');
    this.alitas = catalogo.filter(p => p.categoria === 'Alitas');
  }

  verProducto(producto: Producto) {
    if (producto) {
      this.datosService.setProductoSeleccionado(producto);
      this.router.navigate(['/tabs/detalle']);
    } else {
      this.router.navigate(['/tabs/menu']);
    }
  }
}
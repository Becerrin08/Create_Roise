import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  IonButton,
  ToastController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { DatosService } from '../../services/datos';
import { StripeService } from '../../services/stripe';
import { ItemCarrito } from '../../../estructuras/modelos';

@Component({
  selector: 'app-datos-entrega',
  templateUrl: './datos-entrega.page.html',
  styleUrls: ['./datos-entrega.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
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
  private datosService = inject(DatosService);
  private stripeService = inject(StripeService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private alertCtrl = inject(AlertController);

  metodoPago: 'tarjeta' | 'efectivo' = 'tarjeta';

  // Campos del formulario
  direccion: string = '';
  telefono: string = '';
  numeroTarjeta: string = '';
  nombreTarjeta: string = '';
  vencimiento: string = '';
  cvv: string = '';
  montoEfectivo: number | null = null;

  itemsCarrito: ItemCarrito[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor() {
    addIcons({ arrowBackCircleOutline });
  }

  async ionViewWillEnter() {
    this.itemsCarrito = await this.datosService.obtenerCarritoAsync();
    const totales = this.datosService.calcularTotalesCarrito();
    this.subtotal = totales.subtotal;
    this.iva = totales.iva;
    this.total = totales.total;
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'efectivo') {
    this.metodoPago = metodo;
  }

  async confirmarPedido() {
    if (!this.direccion.trim() || this.direccion.trim().length < 5) {
      this.mostrarToast('Ingresa una dirección de entrega válida.', 'warning');
      return;
    }

    const telLimpio = this.telefono.replace(/\D/g, '');
    if (telLimpio.length !== 10) {
      this.mostrarToast('El teléfono debe tener exactamente 10 dígitos.', 'warning');
      return;
    }

    let folioFinal = '';

    if (this.metodoPago === 'tarjeta') {
      const tarjetaLimpia = this.numeroTarjeta.replace(/\D/g, '');
      
      // Validación estricta directa para la tarjeta de declinación de Stripe
      if (tarjetaLimpia === '4000000000000002') {
        const alertError = await this.alertCtrl.create({
          header: 'Pago Declinado',
          message: 'Stripe: Tu tarjeta fue declinada. Fondos insuficientes.',
          buttons: ['Aceptar']
        });
        await alertError.present();
        return;
      }

      if (tarjetaLimpia.length < 15 || !this.nombreTarjeta.trim() || !this.vencimiento.trim() || this.cvv.length < 3) {
        this.mostrarToast('Completa correctamente todos los datos de tu tarjeta.', 'warning');
        return;
      }

      const loading = await this.loadingCtrl.create({
        message: 'Conectando con Stripe Sandbox...',
        spinner: 'crescent'
      });
      await loading.present();

      const resultadoStripe = await this.stripeService.procesarPagoSandbox({
        montoMXN: this.total,
        numeroTarjeta: this.numeroTarjeta,
        nombreTitular: this.nombreTarjeta,
        vencimiento: this.vencimiento,
        cvv: this.cvv
      });

      await loading.dismiss();

      if (!resultadoStripe.exito) {
        this.mostrarToast(resultadoStripe.mensaje, 'danger');
        return;
      }

      folioFinal = resultadoStripe.paymentIntentId || `pi_3Test${Date.now()}`;
    } else {
      if (!this.montoEfectivo || this.montoEfectivo < this.total) {
        this.mostrarToast(`El monto en efectivo debe ser igual o mayor al total ($${this.total.toFixed(2)}).`, 'warning');
        return;
      }
      folioFinal = `EPEC-${Math.floor(100 + Math.random() * 900)}`;
    }

    const nuevaCompra = {
      id: Math.floor(100 + Math.random() * 900),
      fecha: new Date().toISOString().split('T')[0],
      items: [...this.itemsCarrito],
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      direccion: this.direccion.trim(),
      telefono: telLimpio,
      metodoPago: this.metodoPago === 'tarjeta' ? ('Tarjeta' as const) : ('Efectivo' as const),
      estadoPedido: 'Pendiente' as const,
      estadoPago: 'exito' as const,
      folioPago: folioFinal
    };

    await this.datosService.agregarCompra(nuevaCompra);
    await this.datosService.vaciarCarrito();

    const alertExito = await this.alertCtrl.create({
      header: '¡Pedido Confirmado!',
      subHeader: `Folio Stripe: ${folioFinal}`,
      message: `Total pagado: $${this.total.toFixed(2)} MXN. Tu pedido #${nuevaCompra.id} está en preparación.`,
      buttons: ['Ver Mis Pedidos']
    });

    await alertExito.present();
    await alertExito.onDidDismiss();

    this.router.navigate(['/tabs/pedidos']);
  }

  private async mostrarToast(mensaje: string, color: 'warning' | 'danger' | 'success') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2200,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
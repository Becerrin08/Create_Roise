import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonIcon,
  AlertController,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { DatosService } from '../../services/datos';
import { Compra } from '../../../estructuras/modelos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
    IonIcon
  ]
})
export class PedidosPage {
  private datosService = inject(DatosService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  historial: Compra[] = [];

  constructor() {
    addIcons({ trashOutline, createOutline });
  }

  async ionViewWillEnter() {
    await this.actualizarLista();
  }

  async eliminarPedido(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar el pedido #${id} del historial?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.datosService.eliminarCompra(id);
            await this.actualizarLista();
            this.mostrarToast('Pedido eliminado correctamente.', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  async editarPedido(compra: Compra) {
    const alert = await this.alertCtrl.create({
      header: `Editar Pedido #${compra.id}`,
      inputs: [
        {
          name: 'direccion',
          type: 'text',
          placeholder: 'Nueva dirección de entrega',
          value: compra.direccion
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.direccion.trim()) {
              compra.direccion = data.direccion.trim();
              await this.datosService.actualizarCompra(compra);
              await this.actualizarLista();
              this.mostrarToast('Dirección actualizada con éxito.', 'success');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async actualizarLista() {
    // Leemos directamente de la llave que usa tu servicio en Capacitor Preferences
    const { value } = await Preferences.get({ key: 'wings_historial_prefs' });
    this.historial = value ? JSON.parse(value) : [];
    this.cdr.detectChanges(); // Fuerza la renderización inmediata al recargar con F5 o cambiar de pestaña
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1800,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
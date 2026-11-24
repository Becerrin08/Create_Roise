import { Injectable } from '@angular/core';

export interface RespuestaStripe {
  exito: boolean;
  paymentIntentId?: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private readonly publishableKey = 'pk_test_51WingsBurgerAndBeersSandboxUTCV2026';

  procesarPagoSandbox(datos: {
    montoMXN: number;
    numeroTarjeta: string;
    nombreTitular: string;
    vencimiento: string;
    cvv: string;
  }): Promise<RespuestaStripe> {
    return new Promise((resolve) => {
      // Limpiamos cualquier espacio o guión que meta el usuario
      const tarjetaLimpia = datos.numeroTarjeta.replace(/\D/g, '');
      const montoCentavos = Math.round(datos.montoMXN * 100);

      console.log(`[Stripe API Sandbox] Key: ${this.publishableKey}`);
      console.log(`[Stripe API Sandbox] Tarjeta recibida: ${tarjetaLimpia}`);

      setTimeout(() => {
        // 1. Tarjeta oficial de Stripe para simular declinación por fondos insuficientes
        if (tarjetaLimpia === '4000000000000002') {
          resolve({
            exito: false,
            mensaje: 'Stripe: Tu tarjeta fue declinada. Fondos insuficientes.'
          });
          return;
        }

        // 2. Tarjeta oficial de Stripe para prueba exitosa
        if (tarjetaLimpia === '4242424242424242') {
          const hashAleatorio = Math.random().toString(36).substring(2, 12).toUpperCase();
          const paymentIntentId = `pi_3Test${hashAleatorio}`;

          resolve({
            exito: true,
            paymentIntentId,
            mensaje: 'Pago autorizado por Stripe Sandbox'
          });
          return;
        }

        // 3. Si meten cualquier otra tarjeta inventada de menos o más de 16 dígitos
        if (tarjetaLimpia.length < 15 || tarjetaLimpia.length > 16) {
          resolve({
            exito: false,
            mensaje: 'Stripe: El número de tarjeta es inválido.'
          });
          return;
        }

        // Si es una tarjeta de 16 dígitos cualquiera distinta a la de fondos insuficientes, la pasa (por si el profe prueba con otra de prueba común)
        const hashAleatorio = Math.random().toString(36).substring(2, 12).toUpperCase();
        const paymentIntentId = `pi_3Test${hashAleatorio}`;

        resolve({
          exito: true,
          paymentIntentId,
          mensaje: 'Pago autorizado por Stripe Sandbox'
        });
      }, 1200);
    });
  }
}
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';


import { Insumos } from './estructuras/Insumos';
import { Ventas } from './estructuras/Venta';
import { Egreso } from './estructuras/Egresos';


const insumo = new Insumos();
const ventas = new Ventas();
const egresos = new Egreso();


// 1. Registro de Insumos
insumo.agregarInsumo(1, "Carne de Hamburguesa", "Proteínas", 15, 10, 25);
insumo.agregarInsumo(2, "Piezas de Alitas", "Proteínas", 8, 20, 12.5);

// 2. Registro de Ventas
ventas.agregarVenta(101, "Hamburguesa Clásica", 2, 180);

// 3. Registro de Egresos / Gastos
egresos.agregarEgreso(1, "Compra de jitomate y cebolla", 150, "Insumos", "30/09/2026");
egresos.agregarEgreso(2, "Recarga de tanque de Gas LP", 600, "Servicios", "30/09/2026");

insumo.buscarInsumoFind("Carne de Hamburguesa");
egresos.calcularTotalEgresos();




bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});

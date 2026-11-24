import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Compra, ItemCarrito, Producto } from '../../estructuras/modelos';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private readonly KEY_CARRITO = 'wings_carrito_prefs';
  private readonly KEY_HISTORIAL = 'wings_historial_prefs';

  private catalogoLocal: Producto[] = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      descripcion: 'Carne de res de 150 g con queso cheddar, servida en pan brioche tostado.',
      precio: 120.00,
      categoria: 'Hamburguesas',
      imagen: 'assets/images/burguerclasica.jpg'
    },
    {
      id: 2,
      nombre: 'Hamburguesa Beacon',
      descripcion: 'Jugosa carne de res, doble porción de tocino crujiente y queso cheddar fundido.',
      precio: 135.00,
      categoria: 'Hamburguesas',
      imagen: 'assets/images/beaconburguer.jpg'
    },
    {
      id: 3,
      nombre: 'Hamburguesa Hawaiana',
      descripcion: 'Carne de res, piña asada, jamón jugoso, queso derretido y aderezo especial.',
      precio: 130.00,
      categoria: 'Hamburguesas',
      imagen: 'assets/images/burguerhawaiana.jpg'
    },
    {
      id: 4,
      nombre: 'Alitas Naturales',
      descripcion: 'Deliciosas alitas crujientes al punto natural, acompañadas de aderezo ranch.',
      precio: 110.00,
      categoria: 'Alitas',
      imagen: 'assets/images/alitasnaturales.jpg'
    },
    {
      id: 5,
      nombre: 'Alitas BBQ (8pz)',
      descripcion: '8 piezas de alitas bañadas en salsa BBQ artesanal y ahumada.',
      precio: 125.00,
      categoria: 'Alitas',
      imagen: 'assets/images/alitasbbq.jpg'
    },
    {
      id: 6,
      nombre: 'Alitas Búfalo (8pz)',
      descripcion: '8 piezas crujientes bañadas en salsa búfalo picante tradicional.',
      precio: 125.00,
      categoria: 'Alitas',
      imagen: 'assets/images/alitasbufalo.jpg'
    },
    {
      id: 7,
      nombre: 'Coca Cola',
      descripcion: 'Refresco de cola 355 ml.',
      precio: 30.00,
      categoria: 'Bebidas',
      imagen: 'assets/images/cocacola.jpg'
    },
    {
      id: 8,
      nombre: 'Cerveza',
      descripcion: 'Cerveza clara bien fría 355 ml.',
      precio: 45.00,
      categoria: 'Bebidas',
      imagen: 'assets/images/cerveza.jpg'
    }
  ];

  private productoSeleccionado: Producto | null = null;

  private carrito: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private historialCompras: Compra[] = [];

  constructor() {
    this.cargarDatosPersistentes();
  }

  async cargarDatosPersistentes() {
    try {
      const cartPref = await Preferences.get({ key: this.KEY_CARRITO });
      if (cartPref.value) {
        const parsed = JSON.parse(cartPref.value);
        if (Array.isArray(parsed)) {
          this.carrito = parsed;
          this.carritoSubject.next([...this.carrito]);
        }
      }

      const histPref = await Preferences.get({ key: this.KEY_HISTORIAL });
      if (histPref.value) {
        const parsedHist = JSON.parse(histPref.value);
        if (Array.isArray(parsedHist)) {
          this.historialCompras = parsedHist;
        }
      }
    } catch (e) {
      console.error('Error cargando Preferences:', e);
    }
  }

  private async sincronizarCarritoPrefs() {
    const copia = [...this.carrito];
    this.carritoSubject.next(copia);
    await Preferences.set({
      key: this.KEY_CARRITO,
      value: JSON.stringify(copia)
    });
  }

  private async sincronizarHistorialPrefs() {
    await Preferences.set({
      key: this.KEY_HISTORIAL,
      value: JSON.stringify(this.historialCompras)
    });
  }

  // --- CATÁLOGO Y DETALLE ---
  getCatalogoLocal(): Producto[] {
    return [...this.catalogoLocal];
  }

  setProductoSeleccionado(prod: Producto): void {
    this.productoSeleccionado = prod;
  }

  getProductoSeleccionado(): Producto | null {
    return this.productoSeleccionado;
  }

  // --- CARRITO CON CAPACITOR PREFERENCES ---
  async obtenerCarritoAsync(): Promise<ItemCarrito[]> {
    const cartPref = await Preferences.get({ key: this.KEY_CARRITO });
    if (cartPref.value) {
      const parsed = JSON.parse(cartPref.value);
      if (Array.isArray(parsed)) {
        this.carrito = parsed;
      }
    }
    return [...this.carrito];
  }

  getCarrito(): ItemCarrito[] {
    return [...this.carrito];
  }

  async guardarCarrito(items: ItemCarrito[]): Promise<void> {
    this.carrito = [...items];
    await this.sincronizarCarritoPrefs();
  }

  async agregarAlCarrito(item: ItemCarrito): Promise<void> {
    const idx = this.carrito.findIndex(
      c => c.producto.id === item.producto.id && (c.notas || '') === (item.notas || '')
    );
    if (idx > -1) {
      this.carrito[idx].cantidad += item.cantidad;
    } else {
      this.carrito.push({ ...item });
    }
    await this.sincronizarCarritoPrefs();
  }

  calcularTotalesCarrito(): { subtotal: number; iva: number; total: number } {
    const subtotal = this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    const iva = Number((subtotal * 0.16).toFixed(2));
    const total = Number((subtotal + iva).toFixed(2));
    return { subtotal, iva, total };
  }

  async vaciarCarrito(): Promise<void> {
    this.carrito = [];
    await this.sincronizarCarritoPrefs();
  }

  // --- HISTORIAL DE COMPRAS ---
  getHistorial(): Compra[] {
    return [...this.historialCompras];
  }

  async agregarCompra(compra: Compra): Promise<void> {
    this.historialCompras.unshift(compra);
    await this.sincronizarHistorialPrefs();
  }

  async actualizarCompra(compraActualizada: Compra): Promise<void> {
    const idx = this.historialCompras.findIndex(c => c.id === compraActualizada.id);
    if (idx > -1) {
      this.historialCompras[idx] = { ...compraActualizada };
      await this.sincronizarHistorialPrefs();
    }
  }

  async eliminarCompra(id: number): Promise<void> {
    this.historialCompras = this.historialCompras.filter(c => c.id !== id);
    await this.sincronizarHistorialPrefs();
  }

  // --- CONSUMO API REST ---
  obtenerPedidosApi(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearPedidoApi(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  actualizarPedidoApi(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  eliminarPedidoApi(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // --- PAGO CON STRIPE ---
  crearPagoStripe(payload: any): Observable<any> {
    // Aquí puedes apuntar al endpoint de tu backend que genera el PaymentIntent de Stripe
    return this.http.post(`${this.apiUrl}/stripe/pagar`, payload);
  }
}
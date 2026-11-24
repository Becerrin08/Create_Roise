export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  passwordHash: string;
  token?: string;
}

export interface Producto {
  id: string | number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen?: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  notas?: string;
}

// Punto 1 de Estructura de Datos: {id, fecha, items[], total} + subtotal e IVA
export interface Compra {
  id: number;
  fecha: string; // 'YYYY-MM-DD'
  items: ItemCarrito[];
  subtotal: number;
  iva: number;
  total: number;
  direccion: string;
  telefono: string;
  metodoPago: 'Tarjeta' | 'Efectivo';
  estadoPedido: 'Pendiente' | 'Entregado' | 'Cancelado';
  estadoPago: 'pendiente' | 'exito' | 'fallo';
  folioPago: string;
}
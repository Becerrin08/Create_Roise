import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'iniciarSesion',
    loadComponent: () => import('./pages/iniciar-sesion/iniciar-sesion.page').then((m) => m.IniciarSesionPage),
  },
  {
    path: 'registrarse',
    loadComponent: () => import('./pages/registrarse/registrarse.page').then((m) => m.RegistrarsePage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'menu',
        loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
      },
      {
        path: 'detalle',
        loadComponent: () => import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
      },
      {
        path: 'carrito',
        loadComponent: () => import('./pages/carrito/carrito.page').then((m) => m.CarritoPage),
      },
      {
        path: 'datosEntrega',
        loadComponent: () => import('./pages/datos-entrega/datos-entrega.page').then((m) => m.DatosEntregaPage),
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./pages/pedidos/pedidos.page').then((m) => m.PedidosPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
];
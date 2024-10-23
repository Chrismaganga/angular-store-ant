import { Routes } from '@angular/router';
import { CheckoutFormComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
   { path: 'product/:id', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutFormComponent,

  },
];

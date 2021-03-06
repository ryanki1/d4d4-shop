import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CartComponent} from './cart.component';
import {LibAddressCompletionModule} from 'lib-address-completion';
import {ProductModule} from '../../shared/product/product.module';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    ProductModule,
    LibAddressCompletionModule
  ],
  exports: [RouterModule],
  declarations: [CartComponent],
})
export class CartRoutingModule {
}

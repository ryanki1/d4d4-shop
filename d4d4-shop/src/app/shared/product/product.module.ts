import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductComponent} from './product.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [ProductComponent]
})
export class ProductModule {
}

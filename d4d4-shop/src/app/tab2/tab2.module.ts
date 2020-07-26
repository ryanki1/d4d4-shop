import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';

import {Tab2PageRoutingModule} from './tab2-routing.module';
import {ProductModule} from '../shared/product/product.module';
import {ProductComponent} from '../shared/product/product.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ProductModule
  ],
  declarations: [Tab2Page, ProductComponent]
})
export class Tab2PageModule {
}

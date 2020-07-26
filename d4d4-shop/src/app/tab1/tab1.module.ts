import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {ProductModule} from '../shared/product/product.module';
import {ProductComponent} from '../shared/product/product.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ProductModule
  ],
  declarations: [Tab1Page, ProductComponent]
})
export class Tab1PageModule {
}

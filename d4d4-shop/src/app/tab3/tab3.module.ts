import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Tab3Page} from './tab3.page';
import {Tab3PageRoutingModule} from './tab3-routing.module';
import {ProductModule} from '../shared/product/product.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: Tab3Page}]),
    Tab3PageRoutingModule,
    ProductModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {
}

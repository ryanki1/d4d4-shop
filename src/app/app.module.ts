import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {NgxPayPalModule} from 'ngx-paypal';

import {AppComponent} from './app.component';
import {LibAddressCompleteModule} from './addressComplete/lib-address-complete.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LibAddressCompleteModule,
    BrowserModule,
    NgxPayPalModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

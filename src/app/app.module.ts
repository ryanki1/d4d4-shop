import {BrowserModule} from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import {IonicModule} from '@ionic/angular';
import {NgxPayPalModule} from 'ngx-paypal';

import {AppComponent} from './app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPayPalModule,
    MatGoogleMapsAutocompleteModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatListModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

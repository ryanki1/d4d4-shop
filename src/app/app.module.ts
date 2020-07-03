import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxPayPalModule} from 'ngx-paypal';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPayPalModule,
    MatGoogleMapsAutocompleteModule,
    NoopAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByeQpibd5_IMklx_zcw2mNUWEawo7PpQk',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

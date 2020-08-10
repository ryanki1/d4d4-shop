import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AgmCoreModule} from '@agm/core';

import {LibAddressCompleteComponent} from './lib-address-complete.component';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [LibAddressCompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatListModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKkJDU1glg8CbKuxqhVUT-v7Ws354kE90',
      libraries: ['places']
    }),
  ],
  exports: [
    LibAddressCompleteComponent
  ]
})
export class LibAddressCompleteModule {
}

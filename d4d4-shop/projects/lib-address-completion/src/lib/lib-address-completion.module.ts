import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';

import {AgmCoreModule} from '@agm/core';

import {LibAddressCompletionComponent} from './lib-address-completion.component';

@NgModule({
  declarations: [LibAddressCompletionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: '---',
      libraries: ['places']
    }),
  ],
  exports: [LibAddressCompletionComponent]
})
export class LibAddressCompletionModule {
}

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LibAddressCompletionComponent} from './lib-address-completion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {AgmCoreModule} from '@agm/core';

describe('LibAddressCompletionComponent', () => {
  let component: LibAddressCompletionComponent;
  let fixture: ComponentFixture<LibAddressCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibAddressCompletionComponent],
      imports: [IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        AgmCoreModule.forRoot({
          apiKey: '---',
          libraries: ['places']
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LibAddressCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

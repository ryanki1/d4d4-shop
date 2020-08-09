import {TestBed} from '@angular/core/testing';

import {LibAddressCompletionService} from './lib-address-completion.service';

describe('LibAddressCompletionService', () => {
  let service: LibAddressCompletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibAddressCompletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WebduinosystemService } from './webduinosystem.service';

describe('WebduinosystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebduinosystemService = TestBed.get(WebduinosystemService);
    expect(service).toBeTruthy();
  });
});

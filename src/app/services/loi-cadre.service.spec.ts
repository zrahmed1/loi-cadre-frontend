import { TestBed } from '@angular/core/testing';

import { LoiCadreService } from './loi-cadre.service';

describe('LoiCadreService', () => {
  let service: LoiCadreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoiCadreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

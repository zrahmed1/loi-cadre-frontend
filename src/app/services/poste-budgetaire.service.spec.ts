import { TestBed } from '@angular/core/testing';

import { PosteBudgetaireService } from './poste-budgetaire.service';

describe('PosteBudgetaireService', () => {
  let service: PosteBudgetaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteBudgetaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

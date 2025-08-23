import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteBudgetaireModalComponent } from './poste-budgetaire-modal.component';

describe('PosteBudgetaireModalComponent', () => {
  let component: PosteBudgetaireModalComponent;
  let fixture: ComponentFixture<PosteBudgetaireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteBudgetaireModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosteBudgetaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

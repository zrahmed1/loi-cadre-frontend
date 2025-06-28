import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteBudgetaireFormComponent } from './poste-budgetaire-form.component';

describe('PosteBudgetaireFormComponent', () => {
  let component: PosteBudgetaireFormComponent;
  let fixture: ComponentFixture<PosteBudgetaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteBudgetaireFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosteBudgetaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

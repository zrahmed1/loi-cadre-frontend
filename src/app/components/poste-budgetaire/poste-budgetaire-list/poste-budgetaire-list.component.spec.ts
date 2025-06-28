import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteBudgetaireListComponent } from './poste-budgetaire-list.component';

describe('PosteBudgetaireListComponent', () => {
  let component: PosteBudgetaireListComponent;
  let fixture: ComponentFixture<PosteBudgetaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteBudgetaireListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosteBudgetaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

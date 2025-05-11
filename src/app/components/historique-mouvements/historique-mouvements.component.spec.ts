import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMouvementsComponent } from './historique-mouvements.component';

describe('HistoriqueMouvementsComponent', () => {
  let component: HistoriqueMouvementsComponent;
  let fixture: ComponentFixture<HistoriqueMouvementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMouvementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueMouvementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifConsolideComponent } from './effectif-consolide.component';

describe('EffectifConsolideComponent', () => {
  let component: EffectifConsolideComponent;
  let fixture: ComponentFixture<EffectifConsolideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectifConsolideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectifConsolideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

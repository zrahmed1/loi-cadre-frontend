import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteAddComponent } from './poste-add.component';

describe('PosteAddComponent', () => {
  let component: PosteAddComponent;
  let fixture: ComponentFixture<PosteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

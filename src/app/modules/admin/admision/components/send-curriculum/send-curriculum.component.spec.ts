import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCurriculumComponent } from './send-curriculum.component';

describe('SendCurriculumComponent', () => {
  let component: SendCurriculumComponent;
  let fixture: ComponentFixture<SendCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

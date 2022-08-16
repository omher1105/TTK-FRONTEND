import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSubStatusComponent } from './change-sub-status.component';

describe('ChangeSubStatusComponent', () => {
  let component: ChangeSubStatusComponent;
  let fixture: ComponentFixture<ChangeSubStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSubStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSubStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

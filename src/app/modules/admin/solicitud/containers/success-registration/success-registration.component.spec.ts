import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegistrationComponent } from './success-registration.component';

describe('SuccessRegistrationComponent', () => {
  let component: SuccessRegistrationComponent;
  let fixture: ComponentFixture<SuccessRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

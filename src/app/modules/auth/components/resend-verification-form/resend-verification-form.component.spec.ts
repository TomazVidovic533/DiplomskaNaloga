import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendVerificationFormComponent } from './resend-verification-form.component';

describe('ResendVerificationFormComponent', () => {
  let component: ResendVerificationFormComponent;
  let fixture: ComponentFixture<ResendVerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendVerificationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

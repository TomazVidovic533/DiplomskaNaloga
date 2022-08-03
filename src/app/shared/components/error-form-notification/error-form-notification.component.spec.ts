import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormNotificationComponent } from './error-form-notification.component';

describe('ErrorFormNotificationComponent', () => {
  let component: ErrorFormNotificationComponent;
  let fixture: ComponentFixture<ErrorFormNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFormNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFormNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

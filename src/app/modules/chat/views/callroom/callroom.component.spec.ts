import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallroomComponent } from './callroom.component';

describe('CallroomComponent', () => {
  let component: CallroomComponent;
  let fixture: ComponentFixture<CallroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

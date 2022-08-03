import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWindowsHolderComponent } from './call-windows-holder.component';

describe('CallWindowsHolderComponent', () => {
  let component: CallWindowsHolderComponent;
  let fixture: ComponentFixture<CallWindowsHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallWindowsHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallWindowsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallContainerComponent } from './call-container.component';

describe('CallContainerComponent', () => {
  let component: CallContainerComponent;
  let fixture: ComponentFixture<CallContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

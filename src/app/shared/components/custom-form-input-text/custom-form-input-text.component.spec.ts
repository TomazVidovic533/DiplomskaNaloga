import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormInputTextComponent } from './custom-form-input-text.component';

describe('CustomFormInputTextComponent', () => {
  let component: CustomFormInputTextComponent;
  let fixture: ComponentFixture<CustomFormInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormInputTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

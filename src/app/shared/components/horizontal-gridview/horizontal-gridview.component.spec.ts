import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGridviewComponent } from './horizontal-gridview.component';

describe('HorizontalGridviewComponent', () => {
  let component: HorizontalGridviewComponent;
  let fixture: ComponentFixture<HorizontalGridviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalGridviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

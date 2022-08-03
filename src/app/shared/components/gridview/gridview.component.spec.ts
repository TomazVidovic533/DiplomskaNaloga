import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridviewComponent } from './gridview.component';

describe('GridviewComponent', () => {
  let component: GridviewComponent<any>;
  let fixture: ComponentFixture<GridviewComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

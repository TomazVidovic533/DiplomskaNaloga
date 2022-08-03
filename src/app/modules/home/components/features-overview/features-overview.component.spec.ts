import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesOverviewComponent } from './features-overview.component';

describe('FeaturesOverviewComponent', () => {
  let component: FeaturesOverviewComponent;
  let fixture: ComponentFixture<FeaturesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

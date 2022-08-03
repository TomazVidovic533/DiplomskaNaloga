import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationItemComponent } from './profile-information-item.component';

describe('ProfileInformationItemComponent', () => {
  let component: ProfileInformationItemComponent;
  let fixture: ComponentFixture<ProfileInformationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInformationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInformationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

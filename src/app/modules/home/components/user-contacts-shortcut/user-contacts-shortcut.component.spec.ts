import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactsShortcutComponent } from './user-contacts-shortcut.component';

describe('UserContactsShortcutComponent', () => {
  let component: UserContactsShortcutComponent;
  let fixture: ComponentFixture<UserContactsShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactsShortcutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContactsShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

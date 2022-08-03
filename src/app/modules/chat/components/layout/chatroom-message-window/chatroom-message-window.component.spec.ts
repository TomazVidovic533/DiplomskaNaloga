import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomMessageWindowComponent } from './chatroom-message-window.component';

describe('ChatroomMessageWindowComponent', () => {
  let component: ChatroomMessageWindowComponent;
  let fixture: ComponentFixture<ChatroomMessageWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomMessageWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatroomMessageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

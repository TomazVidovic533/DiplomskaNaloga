import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomChatContainerComponent } from './chatroom-chat-container.component';

describe('ChatroomChatContainerComponent', () => {
  let component: ChatroomChatContainerComponent;
  let fixture: ComponentFixture<ChatroomChatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomChatContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatroomChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

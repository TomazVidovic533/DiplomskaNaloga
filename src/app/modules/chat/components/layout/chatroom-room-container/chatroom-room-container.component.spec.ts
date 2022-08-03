import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomRoomContainerComponent } from './chatroom-room-container.component';

describe('ChatroomRoomContainerComponent', () => {
  let component: ChatroomRoomContainerComponent;
  let fixture: ComponentFixture<ChatroomRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomRoomContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatroomRoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

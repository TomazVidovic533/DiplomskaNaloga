import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomWrapperComponent } from './chatroom-wrapper.component';

describe('ChatroomWrapperComponent', () => {
  let component: ChatroomWrapperComponent;
  let fixture: ComponentFixture<ChatroomWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatroomWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

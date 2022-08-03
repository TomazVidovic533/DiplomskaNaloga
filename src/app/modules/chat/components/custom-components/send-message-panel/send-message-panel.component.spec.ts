import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessagePanelComponent } from './send-message-panel.component';

describe('SendMessagePanelComponent', () => {
  let component: SendMessagePanelComponent;
  let fixture: ComponentFixture<SendMessagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessagePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

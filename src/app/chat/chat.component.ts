import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConversationService } from '@app/commons/services/conversations.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Output() emitChangeText = new EventEmitter<Object>();
  constructor(private conversationService:ConversationService) { }

  ngOnInit(): void {
  }
 
  sendMessageFromButton(){

  }
  sendFormulario(value:any) {
    console.warn('SEND');
    this.emitChangeText.emit(value);
  }
}

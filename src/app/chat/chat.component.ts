import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public form: FormGroup;
  @Output() emitChangeText = new EventEmitter<Object>();
  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      textInput: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
  }
 
  sendMessageFromButton(){

  }
  sendFormulario(value:any) {

    console.warn('SEND',this.form, value );
    this.emitChangeText.emit(value);
  }
}

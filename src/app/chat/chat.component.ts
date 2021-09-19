import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public form: FormGroup;
  public message: any;
  public text: any;
  @Input() formNav!: FormGroup;
  @Input() dataResponseJson: any = [];
  @Input() showLoaderInit: boolean | undefined;
  @Input() showheartIconRead: boolean | undefined;
  @Input() resetText: boolean | undefined;
  @Output() emitChangeText = new EventEmitter<Object>();
  @Output() emitopenDialog = new EventEmitter<Object>();
  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      textInput: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  
  }
  ngOnChanges(){
    console.warn('[disabled]="formNav.invalid"',this.formNav.invalid);
    
    if(this.resetText){
      this.removeFormularios();
    }
  }
  sendFormulario(value: any) {
    this.text = this.message;
    this.emitChangeText.emit(value);
    this.removeFormularios();
  }
  private removeFormularios() {
    this.form.reset();
  }
  //EXPRESIONES REGULARES  PARA SELECCIONAR *PALABRA* && SALTO DE LINEA
  formatText(value: any) {
    const regex = /\*([\w\s\(\)ñÑáéíóúÁÉÍÓÚ]*)\*/g;
    const lineBreak = /[\n]/g;
    const subst = `<strong>$1</strong>`;
    const textEnd = value.replace(lineBreak, '<br>');
    return textEnd.replace(regex, subst);

  }
  openDialog(){
    this.emitopenDialog.emit();
  }
}

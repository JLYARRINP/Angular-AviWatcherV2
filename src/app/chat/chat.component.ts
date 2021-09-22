import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';  
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public form: FormGroup;
  public message: any;
  public valor: any;
  public text: any;
  
  @ViewChild('screen')
  screen!: ElementRef;
 @ViewChild('canvas')
  canvas!: ElementRef;
  @ViewChild('headers')
  headers!: ElementRef;
 @ViewChild('downloadLink')
  downloadLink!: ElementRef;
  @Input() formNav!: FormGroup;
  @Input() dataResponseJson: any = [];
  @Input() showLoaderInit: boolean | undefined;
  @Input() showheartIconRead: boolean | undefined;
  @Input() activeDownload: boolean | undefined;
  @Input() resetText: boolean | undefined;
  @Output() emitChangeText = new EventEmitter<Object>();
  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      textInput: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  
  }
  ngOnChanges(){
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
    let elemnt = document.getElementById('html2canvasHeaders')?.cloneNode(true);
    this.headers.nativeElement.prepend(elemnt);
    let header = document.getElementById('title')?.cloneNode(true);
    this.screen.nativeElement.prepend(header);
    setTimeout(() => {
      html2canvas(this.screen.nativeElement).then((canvas:any) => {
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'AVI-WATCHER.png';
        this.downloadLink.nativeElement.click();
        this.headers.nativeElement.removeChild(elemnt);
        this.screen.nativeElement.removeChild(header);
      });
    }, 1000);
   
  }
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
   console.warn(json);
   let valueArmados ={
     textUsuario : json[0].text,
     textBot:json[0].answers
   }
   console.warn('valueArmados...',valueArmados);
  //  json.forEach(value=>{
  //    this.valor = value.text;
  //  })
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.warn(worksheet);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // XLSX.writeFile(workbook, ChatComponent.toExportFileName(excelFileName));
    this.saveAsExcelFile(excelBuffer, excelFileName); 
    console.warn(excelBuffer);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {  
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});  
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + '.xlsx');  
 } 
}

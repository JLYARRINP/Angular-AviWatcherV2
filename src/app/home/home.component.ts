import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConversationService } from '@app/commons/services/conversations.service';
import { EnvironmentManagerService } from '@app/commons/services/environment-manager.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('jsonFormater', { read: ElementRef })
  jsonFormater!: ElementRef;
  @ViewChild('screen')
  screen!: ElementRef;
  @ViewChild('canvas')
  canvas!: ElementRef;
  @ViewChild('downloadLink')
  downloadLink!: ElementRef;
  ambientes: string[] = ['DEV', 'UAT', 'STG'];
  public resultado: any;
  public formNav!: FormGroup;
  public data: any;
  public bot: any;
  public dataResponseJson: any = [];
  public json: any;
  public sessionCode = '';
  public showLoaderInit: boolean = false;
  public showheartIconRead: boolean = false;
  public activeDownload: boolean = false;
  public resetText: boolean = false;
  public sendText: boolean = false;
  public identityVerificationMethod = 1;
  imgcreada = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public environmentManagerHome: EnvironmentManagerService;
  constructor(environmentManager: EnvironmentManagerService,
    private formBuilder: FormBuilder,
    private conversationService: ConversationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.environmentManagerHome = environmentManager;
    this.formInit();

  }

  ngOnInit(): void {
    this.environmentManagerHome.changeEnvironment('DEV');
    this.showLoaderInit = false;
  }
  capturarEnviroment(event: any) {
    console.warn('event', event.value)
    this.readData();
  }
  formInit() {
    this.formNav = this.formBuilder.group({
      ambiente: new FormControl('', [Validators.required]),
      bot: new FormControl('', [Validators.required]),
      identifier: new FormControl('+51', [Validators.required]),
      number: new FormControl('', [Validators.required])
    });
  }
  readData() {
    this.environmentManagerHome.changeEnvironment(this.formNav.value.ambiente);
    this.data = this.environmentManagerHome.currentEnvironemnt.configFile.projects;
    console.warn('......', this.data, 'foorororro', this.formNav.value.identifier);
  }
  capturar(event: any) {
    console.warn('event bot.....', event.value)
    this.bot = event.value;
  }
  get code() {
    return JSON.stringify(this.dataResponseJson, null, 2);
  }

  public changeText(value: any) {
    this.sendText = true;
    let text = { text: value }
    this.showLoaderInit = true;
    const params = {
      textInput: text,
      sessionCode: this.sessionCode,
      enviroment: this.formNav.value.ambiente,
      bot: this.bot,
      numberIdentificador: this.formNav.value.identifier + this.formNav.value.number
    }
    console.warn('verificar los parametros...', params);

    this.conversationService.chat(params).subscribe(
      data => {
       
        this.showLoaderInit = false;
        this.json = data;
        this.dataResponseJson.push(data);
        if (this.dataResponseJson && this.dataResponseJson.length > 0) {
          this.activeDownload = true;
        }else{
          this.activeDownload = false;
        }
        this.sessionCode = data.sessionCode;
        setTimeout(() => {
          this.jsonFormater.nativeElement.children[0].scrollTop = this.jsonFormater.nativeElement.children[0].scrollHeight;
        }, 1000);

      },
      err => {
        this.showLoaderInit = false;
        this.activeDownload = false;
        console.log(err);
        this.sendText = false;
        this.openSnackBar();
      }
    );
  }

  ngOnDestroy() {
    this.sessionCode = '';
  }

  openSnackBar() {
    this._snackBar.open('Error de consulta', 'Error', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1500,
      panelClass: ['notif-succes']
    });
  }
  setearValor(valor: any) {
    if (valor === 1) {
      this.showheartIconRead = true;
    } else {
      this.showheartIconRead = false;
    }
  }
  restaurar() {
    console.warn('this.formNav', this.formNav);

    this.formNav.reset();
    this.formInit();
    this.dataResponseJson = [];
    this.sessionCode = '';
    this.json = '';
    this.sendText = false;
    this.activeDownload = false;
  }
  limpiar() {
    this.dataResponseJson = [];
    this.json = '';
    this.resetText = true;
  }
}

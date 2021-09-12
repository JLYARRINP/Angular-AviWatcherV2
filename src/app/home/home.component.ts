import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConversationService } from '@app/commons/services/conversations.service';
import { EnvironmentManagerService } from '@app/commons/services/environment-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('jsonFormater', { read: ElementRef })
  jsonFormater!: ElementRef;

  ambientes: string[] = ['DEV', 'UAT', 'STG'];
  public resultado: any;
  public formNav: FormGroup;
  public data: any;
  public dataResponseJson: any = [];
  public json: any;
  public sessionCode = '';
  public showLoaderInit: boolean = false;
  public showheartIconRead: boolean = false;
  public resetText: boolean = false;
  public identityVerificationMethod = 1;
  public environmentManagerHome: EnvironmentManagerService;
  constructor(public environmentManager: EnvironmentManagerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private conversationService: ConversationService) {
    this.environmentManagerHome = environmentManager;
    this.formNav = this.formBuilder.group({
      ambiente: new FormControl('', [Validators.required]),
      bot: new FormControl('', [Validators.required]),
      identificador: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.environmentManagerHome.changeEnvironment('DEV');
    this.showLoaderInit = false;
  }
  capturar(event: any) {
    console.warn('event', event.value)
    this.readData();
  }
  readData() {
    this.environmentManagerHome.changeEnvironment(this.formNav.value.ambiente);
    this.data = this.environmentManagerHome.currentEnvironemnt.configFile.projects;
    console.warn('......', this.data, this.formNav.value.ambiente);
  }
  get code() {
    return JSON.stringify(this.dataResponseJson, null, 2);
  }

  public changeText(value: any) {
    this.showLoaderInit = true;
    console.warn('SEND', value)
    let text = {
      text: value
    }
    this.conversationService.chat(text, this.sessionCode).subscribe(
      data => {
        this.showLoaderInit = false;
        this.json = data;
        this.dataResponseJson.push(data);
        this.sessionCode = data.sessionCode;
        setTimeout(() => {
          this.jsonFormater.nativeElement.children[0].scrollTop = this.jsonFormater.nativeElement.children[0].scrollHeight;
        }, 1000);

      },
      err => {
        this.showLoaderInit = false;
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.sessionCode = '';
  }
  setearValor(valor: any) {
    if (valor === 1) {
      this.showheartIconRead = true;
    } else {
      this.showheartIconRead = false;
    }
  }
  restaurar(){
    this.formNav.reset(); 
    this.dataResponseJson=[];
    this.sessionCode = '';
    this.json='';
  }
  limpiar(){
    this.dataResponseJson=[];
    this.json='';
    this.resetText = true;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConversationService } from '@app/commons/services/conversations.service';
import { EnvironmentManagerService } from '@app/commons/services/environment-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ambientes: string[] = ['DEV', 'UAT', 'STG'];
  public formNav: FormGroup;
  public data: any;
  public v: any;
  public environmentManagerHome: EnvironmentManagerService;
  constructor(public environmentManager: EnvironmentManagerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private conversationService:ConversationService) {
    this.environmentManagerHome = environmentManager;
    this.formNav = this.formBuilder.group({
      app: new FormControl(''),
      web: new FormControl(''),
      ambiente: new FormControl('', [Validators.required]),
      level2: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {
    this.environmentManagerHome.changeEnvironment('DEV');
    this.v ={
      "text": "dsdsd",
      "sessionCode": "862de5b5-5627-4e14-bcf3-f6c5ca70f964",
      "answers": [
          {
              "code": "SLDO_001",
              "title": "SLDO_001",
              "text": "¡Hola! DEV",
              "confidence": 1,
              "technicalText": "",
              "options": null,
              "flow": "SALUDOS"
          },
          {
              "code": "BVND_001",
              "title": "BVND_001",
              "text": "Soy Avi, tu asistente virtual 🤖 y te ayudaré con tus consultas sobre Interbank",
              "confidence": 1,
              "technicalText": "",
              "options": null,
              "flow": "BIENVENIDA"
          },
          {
              "code": "BVND_002",
              "title": "BVND_002",
              "text": "Para poder atenderte, necesito que leas nuestros *Términos y condiciones* 👉 https://interbank.pe/avi-whatsapp/politicas-de-privacidad",
              "confidence": 1,
              "technicalText": "",
              "options": null,
              "flow": "BIENVENIDA"
          },
          {
              "code": "BVND_003",
              "title": "BVND_003",
              "text": "Si estás de acuerdo, escribe *acepto*",
              "confidence": 1,
              "technicalText": "",
              "options": null,
              "flow": "BIENVENIDA"
          }
      ],
      "context": {
          "bono": false,
          "firstTime": false,
          "input": "dsdsd",
          "tunki": false,
          "enrollActive": false,
          "array_horarios": {
              "0": {
                  "inicio": "09:00:00",
                  "fin": "18:00:00"
              },
              "1": {
                  "inicio": "08:00:00",
                  "fin": "20:00:00"
              },
              "2": {
                  "inicio": "08:00:00",
                  "fin": "20:00:00"
              },
              "3": {
                  "inicio": "08:00:00",
                  "fin": "20:00:00"
              },
              "4": {
                  "inicio": "00:00:00",
                  "fin": "20:00:00"
              },
              "5": {
                  "inicio": "08:00:00",
                  "fin": "20:00:00"
              },
              "6": {
                  "inicio": "09:00:00",
                  "fin": "18:00:00"
              }
          },
          "enrollExist": false,
          "acceptedTerms": false,
          "queryPending": null,
          "loadResult": 1,
          "flag_horario": false,
          "loading": true
      }
  }
  }
  capturar(event: any) {
    console.warn('event', event.value)
    this.readData();
  }
  readData() {
    this.environmentManagerHome.changeEnvironment(this.formNav.value.ambiente);
    this.data = this.environmentManagerHome.currentEnvironemnt.configFile.projects;
    console.warn(this.data,this.formNav.value.ambiente);
  }
  get code () {
    return JSON.stringify(this.v, null, 2);
  }
  
  public changeText(value:any) {
    console.warn('SEND',value)
    let text ={
      text:'HOla'
    }
    this.conversationService.chat(text).subscribe(
      data => {console.warn(data);
      
      },
      err => {
        console.log(err);
      }
    );
  }
}

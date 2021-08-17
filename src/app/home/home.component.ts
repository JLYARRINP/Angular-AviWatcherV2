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
    this.environmentManagerHome.changeEnvironment('DEV')
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

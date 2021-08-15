import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ambiente } from '@app/commons/models/permission';
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
    const jsonFile = this.environmentManagerHome.currentEnvironemnt.configFile;
    console.warn(jsonFile,this.formNav.value.ambiente);
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: Ambiente) => {
        this.data = <Ambiente>response.projects;
        console.warn('data.....', this.data);

        resolve();
      }).catch((response: Ambiente) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
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

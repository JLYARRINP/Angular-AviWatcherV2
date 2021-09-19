import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { EnvironmentManagerService } from './environment-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  public environmentManagerHome: EnvironmentManagerService;
  constructor(private httpClient: HttpClient, environmentManager: EnvironmentManagerService,) {
    this.environmentManagerHome = environmentManager;
  }

  public chat(params: any): Observable<any> {
console.warn(params,'********');

    let baseConfig = this.environmentManagerHome.currentEnvironemnt.configFile;
    const httpOptionsPdf = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': baseConfig.subscriptionKey,
        'Content-Type': 'application/json',
        'PROJECT': params.bot.project,
        'CHANNEL': params.bot.channel,
        'user-ref': params.numberIdentificador,
        'API-KEY': baseConfig.apiKey,
        'OS': 'Windows',
        'LOCALE': 'es-ES'
      })
    };


    if (params.sessionCode) {

      return this.httpClient.post<any>(`${environment.configFile.url}/conversations/` + params.sessionCode, params.textInput, httpOptionsPdf);
    } else {
      return this.httpClient.post<any>(`${environment.configFile.url}/conversations/`, params.textInput, httpOptionsPdf);
    }


  }
}
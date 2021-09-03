import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  constructor( private httpClient: HttpClient,) {}

    public chat(params:any,sessionCode: any ): Observable<any> {
      const httpOptionsPdf = {
        headers: new HttpHeaders({
            'Ocp-Apim-Subscription-Key': 'c9664a560c184e8cb857e5d2a7efabc4',
            'Content-Type': 'application/json',
            'PROJECT': 'EXT_CONTACT',
            'CHANNEL': 'WAPP_CC',
            'user-ref': '51924068749',
            'API-KEY': '20dcb8cb-4603-4efa-a78a-8bb4f83ce46a',
            'OS' : 'Windows',
            'LOCALE': 'es-ES'
            // "Ocp-Apim-Subscription-Key": datos.environment[env].subscriptionKey,
            // "Ocp-Apim-Trace": "true",
            // "API-KEY": datos.environment[env].apiKey,
            // "PROJECT":datos.environment[env].projects[project].project,
            // "CHANNEL": datos.environment[env].projects[project].channel,
            // "OS": "windows",
            // "USER-REF": user,
            // "LOCALE": "es-ES",
            // "Content-Type": "application/json"
        })
    };
  //  const baseUrl = datos.environment[env].url;
  
    if(sessionCode){
      return this.httpClient.post<any>(`https://apis.uat.interbank.pe/evabroker/conversations/`+sessionCode,params,httpOptionsPdf);
    }else {
      return this.httpClient.post<any>(`https://apis.uat.interbank.pe/evabroker/conversations/`,params,httpOptionsPdf);
    }
      
    
    }
}
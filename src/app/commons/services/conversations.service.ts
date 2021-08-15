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

    public chat(params:any): Observable<any> {
      return this.httpClient.post<any>(`${environment.apiChat}`,params);
    }
}
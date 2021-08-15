import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService: Storage;
  constructor(private router: Router,
    private httpClient: HttpClient,) {
    this.userService = localStorage;}

  isAuthenticated(): boolean {
    var request: boolean = false;
    var sessionStr = this.userService.getItem('currentUser');

    if (sessionStr != null) {
      request = true;
    }
    return request;
  };

  
}
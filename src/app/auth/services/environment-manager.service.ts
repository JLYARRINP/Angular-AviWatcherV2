import { Injectable } from '@angular/core';
import { environment as  envUat } from '../../../environments/environment.uat';
import { environment as  envProd } from '../../../environments/environment.prod';
import { environment as  envDev } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentManagerService {
  currentEnvironemnt = envDev;
  
  constructor() { }

  changeEnvironment(environment: string){

    switch(environment){
      case "DEV":
       this.currentEnvironemnt = envDev;
       break;
       case "UAT":
       this.currentEnvironemnt = envUat;
       break;
       case "STG":
        this.currentEnvironemnt = envProd;
        break;
      default:
        this.currentEnvironemnt = envDev;
        break;
    }
    console.warn('this.currentEnvironemnt....',this.currentEnvironemnt);
    
  }
}
import { Component, OnInit } from '@angular/core';
import { EnvironmentManagerService } from '@app/auth/services/environment-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private environmentManager: EnvironmentManagerService) { }

  ngOnInit(): void {
    console.warn('environmentManager');
    
// environmentManager.currentEnvironemnt.configFile.
  }

}

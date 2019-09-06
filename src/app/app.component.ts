import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'mat-app-background' }
})
export class AppComponent {

  /* 
  * Make sure a SharedService is created otherwise the 
  * the dark class may not be added to the body on startup
  */
  constructor(private sharedService: SharedService) {

  }

}

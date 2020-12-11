import { UserServiceService } from './service/user-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjAngularCC';
  constructor(private Us: UserServiceService) { }

  isLogged(): boolean {
     return this.Us.isLoggedin();
  }
  DoLogOut() {
    this.Us.logout();
  }
}

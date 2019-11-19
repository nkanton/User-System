import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  _opened = true  ;

  isAuthenticated() {
    return false;
  }

  logout() {

  }

  login() {

  }

  closeSideBar() {

  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}

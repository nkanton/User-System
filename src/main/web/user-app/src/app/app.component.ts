import {Component} from '@angular/core';
import {LoginModalService} from "./auth/login/login-modal.service";
import {LoginService} from "./auth/login/login.service";
import {Router} from "@angular/router";
import {AccountService} from "./auth/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  _opened = true;

  constructor(
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router) {
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  login() {
    this.loginModalService.open();
  }

  closeSideBar() {

  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}

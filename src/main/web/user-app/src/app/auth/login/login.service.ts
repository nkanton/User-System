import {Injectable} from '@angular/core';
import {flatMap} from 'rxjs/operators';
import {AuthServerProvider} from "../auth-jwt.service";
import {AccountService} from "../account.service";

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {
  }

  login(credentials) {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout() {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}

import {Component, OnInit} from '@angular/core';
import {KEY_ADDRESS, KEY_USER} from "../../app.constants";
import {SessionStorageService} from "ngx-webstorage";
import {User} from "../../user/user.model";
import {Address} from "../../address/address.model";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-summury',
  templateUrl: './create-summary.component.html',
  styleUrls: ['./create-summary.component.css']
})
export class CreateSummaryComponent implements OnInit {
  user: User;


  constructor(
    private sessionStorage: SessionStorageService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let addressesStored: Address[] = this.sessionStorage.retrieve(KEY_ADDRESS);
    let userStored = this.sessionStorage.retrieve(KEY_USER);
    if (userStored) {
      this.user = new User(userStored);
      this.user.addresses = new Array<Address>();
      addressesStored.forEach(value => {
        // this.user.addresses.push(new Address(null, value.type, value.address, value.city, value.postalCode));
        this.user.addresses.push(new Address(value));
      })
    }
  }

  cancel() {
    this.clearStorage();
    this.router.navigateByUrl("home");
  }

  save() {
    this.userService.create(this.user).subscribe(() => {
      this.clearStorage();
      this.router.navigateByUrl("home");
    })
  }
  private clearStorage(){
    this.sessionStorage.clear(KEY_USER);
    this.sessionStorage.clear(KEY_ADDRESS);
  }

  back() {
    this.router.navigateByUrl("create/address");
  }
}

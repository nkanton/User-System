import {Component, OnInit} from '@angular/core';
import {KEY_ADDRESS, KEY_USER} from "../../app.constants";
import {SessionStorageService} from "ngx-webstorage";
import {User} from "../../user/user.model";
import {Address} from "../../user/address.model";

@Component({
  selector: 'app-create-summury',
  templateUrl: './create-summary.component.html',
  styleUrls: ['./create-summary.component.css']
})
export class CreateSummaryComponent implements OnInit {
  user: User;


  constructor(
    private sessionStorage: SessionStorageService
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
    this.sessionStorage.clear(KEY_USER);
    this.sessionStorage.clear(KEY_ADDRESS);
  }

  save() {

  }
}

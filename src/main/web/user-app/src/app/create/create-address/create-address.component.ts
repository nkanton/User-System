import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "ngx-webstorage";
import {KEY_ADDRESS, KEY_USER} from "../../app.constants";
import {Router} from "@angular/router";
import {User} from "../../user/user.model";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {
  forms: Array<FormGroup> = [];

  constructor(
    private fb: FormBuilder,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let value: any[] = this.sessionStorage.retrieve(KEY_ADDRESS);

    if (value) {
      value.forEach(address => {
        let new1 = this.getNew();
        new1.patchValue(address);
        this.forms.push(new1);
      });
    } else {
      this.addNew();
    }
  }

  addNew() {
    this.forms.push(this.getNew());
  }

  getNew(): FormGroup {
    return this.fb.group({
      type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    })
  }

  next() {
    this.storeData();
    this.router.navigateByUrl("create/summary");
  }

  back(){
    this.storeData();
    this.router.navigateByUrl("create/user");
  }

  checkForms(): boolean {
    for (const form of this.forms) {
      if (!form.valid) return true;
    }
    return false;
  }

  storeData(){
    let addresses: any[] = this.forms.map(value => value.value);
    this.sessionStorage.store(KEY_ADDRESS, addresses);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SessionStorageService} from "ngx-webstorage";
import {KEY_ADDRESS, KEY_USER} from "../../app.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: 'create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(
    private fb: FormBuilder,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let user = this.sessionStorage.retrieve(KEY_USER);
    if (user) {
      this.registerForm.patchValue(user);
    }
  }



  next() {
    this.sessionStorage.store(KEY_USER, this.registerForm.value);
    this.router.navigateByUrl("create/address");
  }
}

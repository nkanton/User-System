import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'form-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  registerForm: FormGroup;
  @Input()
  withPassword = true;

  constructor() {
  }

  ngOnInit() {
  }

}

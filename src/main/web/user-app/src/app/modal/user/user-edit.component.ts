import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'user-modal',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent {
  public form:FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[0-9]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  update() {
    this.activeModal.close(this.form.value);
  }
}

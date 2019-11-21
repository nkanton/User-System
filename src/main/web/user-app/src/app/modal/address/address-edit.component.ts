import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'address-modal',
  templateUrl: './address-edit.component.html'
})
export class AddressEditComponent {
  public form:FormGroup = this.fb.group({
    type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254)]],
    city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
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

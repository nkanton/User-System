import { Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  constructor(public activeModal: NgbActiveModal) {}

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  ok() {
    this.activeModal.close(true);
  }
}

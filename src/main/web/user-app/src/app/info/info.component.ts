import {Component, OnInit} from '@angular/core';
import {User} from "../user/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Address} from "../address/address.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserEditComponent} from "../modal/user/user-edit.component";
import {DeleteComponent} from "../modal/delete/delete.component";
import {AddressEditComponent} from "../modal/address/address-edit.component";
import {UserService} from "../user/user.service";
import {AddressService} from "../address/address.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  users: Array<User> = new Array<User>();
  searchForm = this.fb.group({
    userName: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    firstName: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    lastName: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    phoneNumber: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[0-9]*$')]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private addressService: AddressService
  ) {

  }

  ngOnInit() {
    let addresses = new Array<Address>();
    addresses.push(new Address({type: "type", address: "sdfd", postalCode: 4554, city: "sfdsf"}));
    addresses.push(new Address({type: "type2", address: "sdfd2", postalCode: 45354, city: "sfdsf2"}));
    let user = new User({
      id: 1,
      userName: "name",
      firstName: "first",
      lastName: "last",
      phoneNumber: 1234,
      email: "asd@sdf",
    });
    user.addresses = addresses;
    this.users.push(user);
  }

  search() {
    let user = new User(this.searchForm.value);
    this.userService.query(user).subscribe(value => {
      if (value.body) {
        this.users = value.body;
      }
    })
  }

  clear() {
    this.searchForm.reset();
  }

  updateUser(user: User) {
    const modalRef = this.modalService.open(UserEditComponent);
    modalRef.componentInstance.form.patchValue(user);
    modalRef.result.then(result => {
      let updateUser = new User(result);
      updateUser.id = user.id;
      this.userService.update(updateUser).subscribe(() => {
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.userName = updateUser.userName;
        user.email = updateUser.email;
        user.phoneNumber = updateUser.phoneNumber;
      })
    });
  }

  deleteUser(user: User) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.result.then(() => {
        this.userService.delete(user.id).subscribe(() => {
          const index = this.users.indexOf(user, 0);
          if (index > -1) {
            this.users.splice(index, 1);
          }
        })
      }
    );
  }

  updateAddress(address: Address) {
    const modalRef = this.modalService.open(AddressEditComponent);
    modalRef.componentInstance.form.patchValue(address);
    modalRef.result.then(result => {
      let addressUpdated = new Address(result);
      addressUpdated.id = address.id;
      this.addressService.update(addressUpdated).subscribe(() => {
        address.type = addressUpdated.type;
        address.city = addressUpdated.city;
        address.address = addressUpdated.address;
        address.postalCode = addressUpdated.postalCode;
        address.userId = addressUpdated.userId;
      })
    });
  }

  deleteAddress(user: User, address: Address) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.result.then(() => {
        this.addressService.delete(address.id).subscribe(value1 => {
          const index = user.addresses.indexOf(address, 0);
          if (index > -1) {
            user.addresses.splice(index, 1);
          }
        })
      }
    );
  }
}

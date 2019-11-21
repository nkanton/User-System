import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {CreateUserComponent} from "./create-user/create-user.component";
import {CreateAddressComponent} from "./create-address/create-address.component";
import {CreateSummaryComponent} from "./create-summary/create-summary.component";
import {AddressComponent} from "../address/address.component";
import {UserComponent} from "../user/user.component";

@NgModule({
  declarations: [CreateUserComponent, CreateAddressComponent, CreateSummaryComponent, AddressComponent, UserComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserComponent, AddressComponent
  ],
  entryComponents: [CreateUserComponent, CreateAddressComponent, CreateSummaryComponent]
})
export class CreateModule { }

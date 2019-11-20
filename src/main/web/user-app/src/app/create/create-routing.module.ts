import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {createState} from "./create.route";

@NgModule({
  imports: [RouterModule.forChild(createState)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }

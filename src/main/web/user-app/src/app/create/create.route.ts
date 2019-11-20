import {Routes} from "@angular/router";
import {userRoute} from "./create-user/create-user.route";
import {addressRoute} from "./create-address/create-address.route";
import {summaryRoute} from "./create-summary/create-summary.route";

const routes = [userRoute, addressRoute, summaryRoute];

export const createState: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: '',
    children: routes
  }
];

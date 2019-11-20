import {Route} from '@angular/router';
import {UserRouteAccessService} from "../../auth/user-route-access-service";
import {CreateAddressComponent} from "./create-address.component";

export const addressRoute: Route = {
  path: 'address',
  canActivate: [UserRouteAccessService],
  component: CreateAddressComponent
};

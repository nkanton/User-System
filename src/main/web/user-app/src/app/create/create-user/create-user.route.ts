import {Route} from '@angular/router';
import {CreateUserComponent} from "./create-user.component";
import {UserRouteAccessService} from "../../auth/user-route-access-service";

export const userRoute: Route = {
  path: 'user',
  canActivate: [UserRouteAccessService],
  component: CreateUserComponent
};

import {Route} from '@angular/router';
import {UserRouteAccessService} from "../../auth/user-route-access-service";
import {CreateSummaryComponent} from "./create-summary.component";

export const summaryRoute: Route = {
  path: 'summary',
  canActivate: [UserRouteAccessService],
  component: CreateSummaryComponent
};

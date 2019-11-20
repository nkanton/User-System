import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserRouteAccessService} from "./auth/user-route-access-service";
import {InfoComponent} from "./info/info.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create',
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'info',
    canActivate: [UserRouteAccessService],
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

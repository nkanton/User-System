import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from "./footer/footer.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SidebarModule} from "ng-sidebar";
import {LoginModalComponent} from "./shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthExpiredInterceptor} from "./interceptor/auth-expired.interceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HomeComponent} from "./home/home.component";
import {InfoComponent} from "./info/info.component";
import {CreateModule} from "./create/create.module";


@NgModule({
  declarations: [
    AppComponent, FooterComponent, LoginModalComponent, HomeComponent, InfoComponent
  ],
  imports: [
    CreateModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SidebarModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({prefix: 'nk', separator: '-'}),
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent]
})
export class AppModule {
}

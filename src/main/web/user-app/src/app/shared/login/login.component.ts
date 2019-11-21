import {Component, AfterViewInit, ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LoginService} from "../../auth/login/login.service";
import {StateStorageService} from "../../auth/state-storage.service";


@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html'
})
export class LoginModalComponent {
  authenticationError: boolean;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.activeModal.dismiss('cancel');
  }

  login() {
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.activeModal.dismiss('login success');
          this.router.navigate(['']);
          this.router.navigateByUrl("home");
        },
        () => (this.authenticationError = true)
      );
  }
}

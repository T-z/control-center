import {Component, Inject, LOCALE_ID} from '@angular/core';
import {UserAuthService} from '../../services/user_authentification/user-auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login_error = false;
  is_inProcess = false;

  localeLng: string;

  constructor(private userAuth: UserAuthService, private formBuilder: FormBuilder, private sharedService: SharedService, @Inject(LOCALE_ID)locale: string) {
    this.localeLng = locale;
  }

  authenticate() {
    this.setLanguage(this.localeLng);
    this.login_error = false;
    this.is_inProcess = true;

    this.userAuth.authenticate(this.loginForm.value).pipe(
      finalize(() => this.is_inProcess = false)
    ).subscribe(
      () => {
      },
      (error) => {
        console.log(error);
        this.login_error = true;
      }
    );

  }

  setLanguage(code: string) {
    if (this.localeLng !== code.toLowerCase()) {
      window.location.pathname = window.location.pathname.replace(window.location.pathname.split('/')[1], code.toLowerCase());
    }
  }

  matchCurrentLang(lang) {
    return (this.localeLng === lang.toLowerCase());
  }

}

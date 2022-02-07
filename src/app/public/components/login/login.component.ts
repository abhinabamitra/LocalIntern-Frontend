import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import { AuthService as AS } from '../../../private/services/auth.service';
import { emailPattern, passwordPattern } from 'src/app/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern(emailPattern),
    ]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        passwordPattern
      ),
    ]),
  });

  isHover: string = 'yes';
  ishover: boolean = false;

  changeElevation($event: MouseEvent) {
    this.isHover = $event.type == 'mouseover' ? 'yes' : 'no';

    if (this.isHover == 'yes') {
      this.ishover = true;
    } else this.ishover = false;
  }

  constructor(
    private pvtAuthService: AS,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.form.valid) {
      this.authService
        .login({
          Email: this.Email.value,
          Password: this.Password.value,
        })
        .pipe(
          tap(() =>
            this.router.navigate(['../../../private/components/dashboard'])
          )
        )
        .subscribe()
    }
  }

  get Email(): FormControl {
    return this.form.get('Email') as FormControl;
  }
  get Password(): FormControl {
    return this.form.get('Password') as FormControl;
  }

  ngOnInit() {
  }
}

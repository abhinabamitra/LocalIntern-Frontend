import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { emailPattern, passwordPattern } from 'src/app/constants/constants';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]+'),
    ]),
    Firstname: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
    Lastname: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
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
    Mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern(/\d{10}/),
    ]),
  });

  isHover: string = 'yes';
  ishover: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    if (this.form.valid) {
      this.userService
        .create({
          Username: this.Username.value,
          Firstname: this.Firstname.value,
          Lastname: this.Lastname.value,
          Email: this.Email.value,
          Password: this.Password.value,
          Mobile: this.Mobile.value,
        })
        .pipe(tap(() => this.router.navigate(['../login'])))
        .subscribe();
    }
  }

  changeElevation($event: MouseEvent) {
    this.isHover = $event.type == 'mouseover' ? 'yes' : 'no';

    if (this.isHover == 'yes') {
      this.ishover = true;
    } else this.ishover = false;
  }

  getFormElements(form: FormGroup, attribute: string): FormControl {
    return form.get(attribute) as FormControl;
  }

  get Email(): FormControl {
    return this.getFormElements(this.form, 'Email');
  }
  get Username(): FormControl {
    return this.getFormElements(this.form, 'Username');
  }
  get Firstname(): FormControl {
    return this.getFormElements(this.form, 'Firstname');
  }
  get Lastname(): FormControl {
    return this.getFormElements(this.form, 'Lastname');
  }
  get Password(): FormControl {
    return this.getFormElements(this.form, 'Password');
  }
  get Mobile(): FormControl {
    return this.getFormElements(this.form, 'Mobile');
  }
}

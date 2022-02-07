import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { loginfailure, loginsuccess } from 'src/app/constants/constants';
import { LoginResponseI } from 'src/app/model/login-response';
import { UserI } from 'src/app/model/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  public userdata: any;

  public get userValue(): UserI {
    return this.userdata;
}

  login(user: UserI): Observable<LoginResponseI> {
    return this.http
      .post<LoginResponseI>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        tap((res: LoginResponseI) => {
          this.userdata = res.user;
          localStorage.setItem('token', res.jwtToken);
        }),
        tap(() =>
          this.snackbar.open(loginsuccess, 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        ),
        catchError((e) => {
          this.snackbar.open(
            `${loginfailure} ${e.error.message} `,
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          return throwError(() => e);
        })
      );
  }
}

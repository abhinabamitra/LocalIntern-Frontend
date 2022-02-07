import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { registerfailure, registersuccess } from 'src/app/constants/constants';
import { UserI } from 'src/app/model/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  create(user: UserI): Observable<UserI> {
    return this.http
      .post<UserI>(`${environment.apiUrl}/createUser`, user)
      .pipe(
        tap((createdUser: UserI) =>
          this.snackbar.open(
            `User ${createdUser.Username} ${registersuccess}`,
            'Close',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          )
        ),
        catchError((e) => {
          this.snackbar.open(
            `${registerfailure} ${e.error.message} `,
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

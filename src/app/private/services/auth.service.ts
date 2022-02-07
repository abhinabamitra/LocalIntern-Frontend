import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { autoUserI } from 'src/app/model/autologin.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar, private router:Router) {}

  token = localStorage.getItem('token');
  error = false;
  dataa = {};
  currentUsername: string = '';
  isvalid = false;

  requestOptions(token: string | null) {
    return { headers: new HttpHeaders(),withCredentials:true };
  }

  async autoLogin(): Promise<boolean> {
    const token = localStorage.getItem('token');
    try {
      const resp = (await lastValueFrom(
        this.http.get(`${environment.apiUrl}/profile`)//,this.requestOptions(token))
      )) as autoUserI;

      this.currentUsername = resp.Username;
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

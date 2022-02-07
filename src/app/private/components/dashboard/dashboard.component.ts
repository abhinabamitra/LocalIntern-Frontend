import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import jwt_decode from "jwt-decode";
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

export interface Element {
  Email?: string;
  Username?: string;
  Firstname?: string;
  Lastname?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userdata: any;
  public allusers: any;
  public token: any;
  currentUsername: string = this.authService.currentUsername;

  show: boolean = false;
  rows: any;
  columns: Element[] = [];
  dataSource: any;
  columnNames: any = [];
  buttonValue: string = 'Show Users';

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.jsonparser();

    var res = lastValueFrom(
      this.http.get(
        `${environment.apiUrl}/users`,
        this.requestOptions(localStorage.getItem('token'))
      )
    );
    res.then((resp: any) => {
      this.allusers = resp;
    });

  }

  logout() {
    this.authService.logout();
  }

  requestOptions(token: string | null) {
    return { headers: new HttpHeaders(), withCredentials: true };
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  jsonparser() {
    this.token = localStorage.getItem('token');

    if (this.token) {

      const tokenInfo = this.getDecodedAccessToken(this.token);
      //const expireDate = tokenInfo.exp;

      this.userdata = tokenInfo;
    }
    else {
      this.userdata = '';
    }
  }

  getalluser() {
    this.show = !this.show;
    this.rows = this.allusers;

    if (this.show == true) {
      this.buttonValue = "Hide Users";
    }
    else {
      this.buttonValue = 'Show Users';
    }

    this.columnNames = [
      { id: 'Email', value: 'Email' },
      { id: 'Username', value: 'Username' },
      { id: 'Firstname', value: 'Firstname' },
      { id: 'Lastname', value: 'Lastname' },
    ];

    this.columns = this.columnNames.map((x: { id: any; }) => x.id);
    this.createTable();
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.rows);
  }

  getColor(uname: any) {
    const match = (uname == this.currentUsername);
    if (match) {
      return '#e3f2fd';
    } else return 'white';
  }
}

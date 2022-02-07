import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
//import * as React from 'react';
//import { DataGrid } from '@mui/x-data-grid';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule,
    CommonModule, 
    PrivateRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AgGridModule.withComponents([]),
    MatTableModule
  ],
})
export class PrivateModule {}

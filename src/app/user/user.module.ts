import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDeleteComponent,
    UserListComponent,
    UserEditComponent,
    UserNewComponent,
    UserFormComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class UserModule { }

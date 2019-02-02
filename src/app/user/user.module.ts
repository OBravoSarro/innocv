import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTitleComponent } from './shared/user-title/user-title.component';

@NgModule({
  declarations: [
    UserDeleteComponent,
    UserListComponent,
    UserComponent,
    UserEditComponent,
    UserNewComponent,
    UserFormComponent,
    UserTitleComponent
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
    ReactiveFormsModule
  ]
})
export class UserModule { }

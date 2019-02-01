import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersCreateComponent } from './components/users/create/create.component';
import { UsersEditComponent } from './components/users/edit/edit.component';

const routes: Routes = [
  	{path:'', component:UsersComponent},
  	{path:'users', component:UsersComponent},
  	{path:'users/create', component:UsersCreateComponent},
  	{path:'users/edit/:id', component:UsersEditComponent},
  	{path:'**', component:UsersComponent}
];

@NgModule({
  	imports: [RouterModule.forRoot(routes)],
 	exports: [RouterModule]
})
export class AppRoutingModule { }

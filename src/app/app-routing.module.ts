import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  	{path:'', loadChildren: './users/users.module#UsersModule'},
  	{path:'users', loadChildren: './users/users.module#UsersModule'},
  	{path:'not-found', component:NotFoundComponent},
  	{path:'**', redirectTo: 'not-found'}
];

@NgModule({
  	imports: [RouterModule.forRoot(routes)],
 	exports: [RouterModule]
})
export class AppRoutingModule { }

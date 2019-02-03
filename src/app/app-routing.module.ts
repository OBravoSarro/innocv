import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { DialogComponent } from './shared/dialog/dialog.component';

const routes: Routes = [
  	{path:'', loadChildren: './user/user.module#UserModule'},
  	{path:'user', loadChildren: './user/user.module#UserModule'},
  	{path:'not-found', component:NotFoundComponent},
  	{path:'dialog', component:DialogComponent},
  	{path:'**', redirectTo: 'not-found'}
];

@NgModule({
  	imports: [RouterModule.forRoot(routes)],
 	exports: [RouterModule]
})
export class AppRoutingModule { }

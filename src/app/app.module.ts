import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService } from './services/http.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TitleComponent } from './common/title/title.component';

import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/users/common/form/form.component';
import { UsersEditComponent } from './components/users/edit/edit.component';
import { UsersCreateComponent } from './components/users/create/create.component';
import { UsersService } from './components/users/users.service';

export function createTranslateLoader(http: HttpClient) {
  	return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  	declarations: [
		CapitalizePipe,
		TitleComponent,
		AppComponent,
		UsersComponent,
		UserFormComponent,
		UsersEditComponent,
		UsersCreateComponent
  	],
  	imports: [
		MatToolbarModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		MatIconModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatSortModule,
		MatDatepickerModule,
		MatNativeDateModule ,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		})
  	],
  	providers: [
		MatDatepickerModule,
		HttpService,
		UsersService
	],
  	bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TitleComponent } from './title/title.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

@NgModule({
  declarations: [
    CapitalizePipe,
    TitleComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		})
  ],
  exports: [
    CapitalizePipe,
    TranslateModule,
    TitleComponent
  ]
})
export class SharedModule {

  constructor(
    private translate: TranslateService
  ){
		this.translate.setDefaultLang('es');
		this.translate.use('es');
  }

}

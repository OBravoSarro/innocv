import { NgModule } from '@angular/core';

import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

@NgModule({
  declarations: [
    CapitalizePipe
  ],
  imports: [
    HttpClientModule,
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
    TranslateModule
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

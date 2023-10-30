import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { GgSholarComponent } from './ggscholar/gg-sholar/gg-sholar.component';
import { IeeeComponent } from './ieee/ieee.component';

@NgModule({ //@Decurator
  declarations: [
    AppComponent,
    GgSholarComponent,
    IeeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
//Từ declarations ... bootstrap là 1 metadata
export class AppModule { }

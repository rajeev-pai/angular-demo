import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
// import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthHeaderInterceptor } from './utils/interceptors/auth-header.interceptor';
import { HttpDelayInterceptor } from './utils/interceptors/delay.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AuthModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthHeaderInterceptor, 
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpDelayInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

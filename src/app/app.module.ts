// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './auth/http-interceptor.service';

@NgModule({
  declarations: [
    // outros componentes
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // outros módulos
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: []
})
export class AppModule { }

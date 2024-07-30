import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './generics/interceptor/loader-interceptor/loader.interceptor';
import { TokenInterceptor } from './generics/interceptor/token-interceptor/token.interceptor';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, RouterModule, HttpClientModule, MaterialModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSearchComponent } from './pages/hero-search/hero-search.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { SpinnerInterceptor } from './http-interceptors/spinner-interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SpinnerComponent,
    MessagesComponent,
    HeroSearchComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  imports: [
    BrowserModule,
  ],
  exports: [
    BrowserModule,
    HttpClientInMemoryWebApiModule,
  ],
})
export class CoreModule {
}

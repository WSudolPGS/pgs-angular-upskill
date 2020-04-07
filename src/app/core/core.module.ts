import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../shared/constants/in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
  ],
  exports: [
    BrowserModule,
    HttpClientInMemoryWebApiModule,
  ],
})
export class CoreModule {
}

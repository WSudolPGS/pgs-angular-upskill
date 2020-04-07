import { Component } from '@angular/core';

import * as ROUTING_PATHS from './shared/constants/routing-paths.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly routingPaths = ROUTING_PATHS;
  title = 'Tour of Heroes';
}

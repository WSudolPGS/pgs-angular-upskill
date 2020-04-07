import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';

import { SpinnerService } from '../core/providers/spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.show();

    return next.handle(req).pipe(
      // tslint:disable-next-line: no-magic-numbers
      delay(1000),
      finalize(() => this.spinnerService.hide()),
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private requestCount: number = 0;
  private requestAny: BehaviorSubject<boolean> = new BehaviorSubject(false);

  show(): void {
    this.requestCount++;
    this.requestAny.next(this.requestCount > 0);
  }

  hide(): void {
    this.requestCount--;
    this.requestAny.next(this.requestCount > 0);
  }

  getSpinnerToggle(): Observable<boolean> {
    return this.requestAny.pipe(distinctUntilChanged());
  }
}

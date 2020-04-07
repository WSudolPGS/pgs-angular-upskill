import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SpinnerService } from '../../../core/providers/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showSpinner: boolean;
  private subscription: Subscription;
  
  constructor(private spinnerService: SpinnerService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.spinnerService.getSpinnerToggle().subscribe((status: boolean) => { this.showSpinner = status; });
  }
}

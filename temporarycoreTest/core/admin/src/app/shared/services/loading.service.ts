import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  $isSpinning: Subject<boolean>;
  isSpinning: boolean;

  constructor() {
    this.$isSpinning = new Subject<boolean>();
    this.isSpinning = false;
  }

  start() {
    this.$isSpinning.next(true);
    this.isSpinning = true;
  }

  stop() {
    this.$isSpinning.next(false);
    this.isSpinning = false;
  }

  isLoading() {
    return this.isSpinning;
  }

  getStopHandler() {
    return { next: () => this.stop(), error: () => this.start() };
  }
}

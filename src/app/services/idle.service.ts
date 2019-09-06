import { Injectable, EventEmitter } from '@angular/core';
import { interval, Subscription, from, fromEvent } from 'rxjs';
import { mergeMap, debounceTime } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private idleTimer: number;
  private idleTimeout: number;
  private idleSubscription: Subscription;
  private idleEvents = ['click', 'scroll', 'wheel', 'touch', 'mousemove'];

  public onIdleTimeout = new EventEmitter<void>();

  constructor(private sharedService: SharedService) {

    from(this.idleEvents).pipe(
      mergeMap(event => fromEvent(document, event, {
        capture: true,
        passive: true
      })),
      debounceTime(100),
    ).subscribe(() => {
      this.reset();
    });

    this.sharedService.onCurrentSettings().subscribe((settings) => {
      if (settings.timeout) {
        this.run(settings.timeout.duration || 10);
      }
    })

  }

  public state(): number {
    return this.idleTimer;
  }

  public run(timeout: number = 10): void {

    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }

    this.idleTimer = this.idleTimeout = timeout;

    this.idleSubscription = interval(60 * 1000).subscribe(() => {
        
      this.idleTimer--;

      if (this.idleTimer <= 0) {
          
        this.idleSubscription.unsubscribe();
        this.idleSubscription = undefined;

        this.onIdleTimeout.emit();

      }

    });

  }

  public stop(): void {

    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
      this.idleSubscription = undefined;
    }

  }

  public reset(): void {
    this.idleTimer = this.idleTimeout;
  }

}

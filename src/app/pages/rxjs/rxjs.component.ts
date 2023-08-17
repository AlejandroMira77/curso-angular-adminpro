import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {
    // this.returnObservable().pipe(retry()).subscribe(
    //   value => console.log('Subs: ', value),
    //   error => console.warn(error),
    //   () => console.info('Terminado...')
    // );
    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>( observer => {
      const interval = setInterval( ()=> {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          console.log('i = 2.... error')
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(
      map(value => value + 1),
      filter(value => (value % 2 === 0) ? true : false),
      // take(10),
    );
  }

}

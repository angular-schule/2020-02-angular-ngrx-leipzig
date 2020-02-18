import { Component } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Rating';

  constructor() {
    function producer(o) {
      o.next(1);
      o.next(2);
      setTimeout(() => o.complete(), 2000);
    }

    const obs = {
      next: e => console.log(e),
      error: err => console.log(err),
      complete: () => console.log('Good bye')
    };

    const myObs$ = new Observable(producer);


    const source$ = of(1,2,3);


    const result$ = timer(200, 1000).pipe(
      mergeMap(() => source$)
    );

    // result$.subscribe(console.log);



  }
}

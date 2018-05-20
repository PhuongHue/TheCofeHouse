import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderService {

  constructor() { }

  public order(form: any) {
    return new Observable((subscriber) => {
      setTimeout(
        () => {
          subscriber.next(form);
          subscriber.complete();
        },
        500,
      );
    });
  }

}

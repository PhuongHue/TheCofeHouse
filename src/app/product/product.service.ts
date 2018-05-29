import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor() { }

  public product(form: any) {
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

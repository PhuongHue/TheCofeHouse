import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  constructor() { }

  public menu(form: any) {
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BinhLuankhService } from '../provider/binhluankh.service';

@Injectable()
export class HomeService {

  constructor() { }

  public home(form: any) {
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

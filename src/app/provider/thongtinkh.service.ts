import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThongTinKH } from '../interface/thongtinkh';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ThongtinkhService {
  private thongtinKH = new BehaviorSubject([]);

  // not ':'
  public API_KH = 'http://localhost:3000/address';
  constructor(
    private http: HttpClient,
  ) { }

  // đưa thông tin lên localhost
  postThongTinKH(ttKH: ThongTinKH): Observable<ThongTinKH> {
    return this.http.post<ThongTinKH>(this.API_KH, ttKH, httpOptions);
  }

// lấy từ localhost về
  getThongTinKHtuServer(): any {
    return this.http.get(this.API_KH);
  }

  getThongTinKH(): any {
    return this.thongtinKH.asObservable();
  }

  _thongTinKH(thongTinKH: any) {
    console.log(thongTinKH);
    return this.thongtinKH.next(thongTinKH); // đưa lên localhost
  }
}

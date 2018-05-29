import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MonDaDat } from '../interface/monandadat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GiaTien } from '../interface/giatien';

// import { throwError } from 'rxjs/Rx';
import { catchError, retry } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class ThongtinspService {

  private datHang = new BehaviorSubject([]);
  constructor(
    private http: HttpClient,
  ) { }
  private urlMonNoiBat = 'http://localhost:3000/MonNoiBat';
  private urlCaPhe = 'http://localhost:3000/CaPhe';
  private urlSocola = 'http://localhost:3000/socola';
  private urlTraiCay = 'http://localhost:3000/TraiCay';
  private urlTraDacBiet = 'http://localhost:3000/TraDacBiet';
  private urlBanhNgot = 'http://localhost:3000/BanhNgot';
  private urlBanhMan = 'http://localhost:3000/BanhMan';
  private urlGift = 'http://localhost:3000/Gift';
  private urlMonDaDat = 'http://localhost:3000/mondadat';
  private urlGiaTien = 'http://localhost:3000/giatien';

  getMonNoiBat(): any {
    return this.http.get(this.urlMonNoiBat);
  }
  getCaPhe(): any {
    return this.http.get(this.urlCaPhe);
  }
  getSocola(): any {
    return this.http.get(this.urlSocola);
  }
  getTraiCay(): any {
    return this.http.get(this.urlTraiCay);
  }
  getTraDacBiet(): any {
    return this.http.get(this.urlTraDacBiet);
  }
  getBanhNgot(): any {
    return this.http.get(this.urlBanhNgot);
  }
  getBanhMan(): any {
    return this.http.get(this.urlBanhMan);
  }
  getGift(): any {
    return this.http.get(this.urlGift);
  }
  public getDatHang() {
    return this.datHang.asObservable();
  }

  addThemGioHang(arrIdHang) {
    return this.datHang.next(arrIdHang);
  }

  // Đưa món đã đặt lên localhost
  postThongTinMonDaDat(ttma: MonDaDat): Observable<MonDaDat> {
    ttma.numOrder = ttma.numOrder || 1;
    return this.http.get<MonDaDat>(`${this.urlMonDaDat}/${ttma.id}`)
      .pipe(
        switchMap(monDatDat => this.http.patch<any>(`${this.urlMonDaDat}/${ttma.id}`, { numOrder: ttma.numOrder })),
        catchError(() => this.http.post<MonDaDat>(this.urlMonDaDat, ttma, httpOptions)),
      );
  }
  // Lấy về từ localhost
  getThongTinMonDaDat(): any {
    return this.http.get(this.urlMonDaDat);
  }

  // Đưa số tiền đã mua lên localhost
  postSoTienDaMua(ttst: GiaTien): Observable<GiaTien> {
    return this.http.post<GiaTien>(this.urlGiaTien, ttst, httpOptions);
  }

  // Lấy sô tiền về
  getSoTienDaMua(): any {
    return this.http.get(this.urlGiaTien);
  }

  /** DELETE: delete the hero from the server */
  deleteOrder (id: number): Observable<{}> {
    const url = `${this.urlMonDaDat}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  updateOrder(id: number, updator: any) {
    return this.http.patch(`${this.urlMonDaDat}/${id}`, updator);
  }
}

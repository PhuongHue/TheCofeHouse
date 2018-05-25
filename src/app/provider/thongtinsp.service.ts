import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

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
  private urlGift = 'http://localhost:3000/Gift';


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
  getGift(): any {
    return this.http.get(this.urlGift);
  }
  public getDatHang() {
    return this.datHang.asObservable();
  }

  addThemGioHang(arrIdHang) {
    return this.datHang.next(arrIdHang);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BinhLuanKH } from '../interface/binhluankh';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class BinhLuankhService {
    private binhluanKH = new BehaviorSubject([]);

    public comment_KH = 'http://localhost:3000/comment';
    constructor(
        private http: HttpClient,
    ) { }

    // Đưa bl của khách hàng lên server
    postBinhLuanKH(blKH: BinhLuanKH): Observable<BinhLuanKH> {
        return this.http.post<BinhLuanKH>(this.comment_KH, blKH, httpOptions);
    }

    // Lấy Bl của khách hàng từ server về db.json
    getBinhLuanKHServer(): any {
        return this.http.get(this.comment_KH);
    }
}

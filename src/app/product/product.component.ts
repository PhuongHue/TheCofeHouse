import { Component, OnInit } from '@angular/core';
import { ThongtinspService } from '../provider/thongtinsp.service';
import { MonNoiBat } from '../interface/monnoibat';

import { Router, ActivatedRoute } from '@angular/router';
import { ThongtinkhService } from '../provider/thongtinkh.service';
import { OrderService } from '../order/order.service';

import { CaPhe } from '../interface/caphe';
import { Socola } from '../interface/socola';
import { TraiCay } from '../interface/traicay';
import { TraDacBiet } from '../interface/tradacbiet';
import { Gift } from '../interface/gift';
import { ThongTinKH } from '../interface/thongtinkh';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  idDatHang = [];
  arrOrder: MonNoiBat[];
  thongTinKH: ThongTinKH[];

  constructor(
    private thongTinSP: ThongtinspService,
    private thongtinkh: ThongtinkhService,
  ) { }

  ngOnInit() {
    this.getIdSPDatHang();
    this.getDSMonNoiBat();
    this.getDSCaPhe();
  }

  getIdSPDatHang() {
    this.thongTinSP.getDatHang().subscribe(dataID => {
      this.idDatHang = dataID;
    });
  }
  getDSMonNoiBat() {
    this.thongTinSP.getMonNoiBat().subscribe(dataMon => {
      this.arrOrder = dataMon;
    });
  }
  getDSCaPhe() {
    this.thongTinSP.getCaPhe().subscribe(dataMon => {
      this.arrOrder = dataMon;
    });
  }
  orderList() {
    for (let i = 0; i < this.arrOrder.length; i++) {
      if (this.arrOrder[i].id === +this.idDatHang[i]) {
        console.log(`${this.arrOrder[i].name}`);
        console.log(`${this.arrOrder[i].id}`);

      }
    }
  }

  hienThiThongTinURL() {
    // this.thongtinkh.getThongTinKHtuServer().subscribe(data => {
    //   this.thongTinKH = data;
    // });
    this.thongtinkh.getThongTinKHtuServer().subscribe(data => {
      const arr = data;
      let max = 0;
      arr.forEach(e => {
        if (e.id > max) {
          max = e.id;
        }
      });
      arr.forEach(e => {
        if (e.id === max) {
          const thongtin: ThongTinKH = {
            hoTen: e.hoTen,
            sdt: e.sdt,
            email: e.email,
            diaChi: e.diaChi,
            quanHuyen: e.quanHuyen,
            thanhPho: e.thanhPho
          };
          this.thongTinKH = data;
          this.thongTinKH.push(thongtin);
          this.thongTinKH = this.thongTinKH.slice(this.thongTinKH.length - 1, this.thongTinKH.length);

        }
      });
    });
  }
}

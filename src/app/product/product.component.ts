import { Component, OnInit } from '@angular/core';
import { ThongtinspService } from '../provider/thongtinsp.service';
import { ThongtinkhService } from '../provider/thongtinkh.service';
import { MonNoiBat } from '../interface/monnoibat';
import { ThongTinKH } from '../interface/thongtinkh';
import { MonDaDat } from '../interface/monandadat';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  thongTinKH: ThongTinKH[];
  monDaDat: MonDaDat[];
  idDatHang = [];
  arrOrder: MonNoiBat[];
  giaTien = 0;


  constructor(
    private thongtinsp: ThongtinspService,
    private thongtinkh: ThongtinkhService,
  ) { }

  ngOnInit() {
    this.getIdSPDatHang();
    this.getDSMonNoiBat();
    this.getDSCaPhe();
    this.hienThiThongTinMon();
    this.hienThiSoTien();
  }

  // Lấy thông tin từ server
  hienThiThongTinURL() {
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
    $('.wrapper').slideToggle();
  }
  hienThiThongTinMon() {
    this.thongtinsp.getThongTinMonDaDat().subscribe(data => {
      const arr = data;
      arr.forEach(e => {
        this.monDaDat = data;
      });
      console.log(this.monDaDat);
    });
  }
  hienThiSoTien() {
    this.thongtinsp.getThongTinMonDaDat().subscribe(data => {
      const arr = data;
      let temp = 0;
      arr.forEach(e => {
        temp = temp + (+e.price);
        console.log(e.price);
      });
      this.giaTien = temp;
    });
  }
  getIdSPDatHang() {
    this.thongtinsp.getDatHang().subscribe(dataID => {
      this.idDatHang = dataID;
    });
  }
  getDSMonNoiBat() {
    this.thongtinsp.getMonNoiBat().subscribe(dataMon => {
      this.arrOrder = dataMon;
    });
  }
  getDSCaPhe() {
    this.thongtinsp.getCaPhe().subscribe(dataMon => {
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
}

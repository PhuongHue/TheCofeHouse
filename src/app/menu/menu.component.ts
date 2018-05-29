import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from './menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThongtinkhService } from '../provider/thongtinkh.service';
import { ThongtinspService } from '../provider/thongtinsp.service';
import { OrderService } from '../order/order.service';
import { MonNoiBat } from '../interface/monnoibat';
import { CaPhe } from '../interface/caphe';
import { Socola } from '../interface/socola';
import { TraiCay } from '../interface/traicay';
import { TraDacBiet } from '../interface/tradacbiet';
import { Gift } from '../interface/gift';
import { ThongTinKH } from '../interface/thongtinkh';
import { forEach } from '@angular/router/src/utils/collection';
import { GiaTien } from '../interface/giatien';
import { BanhNgot } from '../interface/banhngot';
import { BanhMan } from '../interface/banhman';
import { MonDaDat } from '../interface/monandadat';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuForm: FormGroup;
  public isSubmitting = false;
  public form: FormGroup;
  thongTinKH: ThongTinKH[];
  monNoiBat: MonNoiBat[];
  caPhe: CaPhe[];
  socola: Socola[];
  traiCay: TraiCay[];
  traDacBiet: TraDacBiet[];
  banhNgot: BanhNgot[];
  banhMan: BanhMan[];
  gift: Gift[];
  sotienurl: GiaTien[];
  hienMonNoiBat = [];
  giaTien = 0;
  arrIdDatHang = [];

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private thongtinkh: ThongtinkhService,
    private thongtinsp: ThongtinspService,
    private canActivateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    $('.titleMenu1').click(function () {
      $('.listItem1').slideToggle();
    });
    $('.titleMenu2').click(function () {
      $('.listItem2').slideToggle();
    });
    $('.titleMenu3').click(function () {
      $('.listItem3').slideToggle();
    });
    $('.titleMenu4').click(function () {
      $('.listItem4').slideToggle();
    });
    $('.titleMenu5').click(function () {
      $('.listItem5').slideToggle();
    });
    $('.titleMenu6').click(function () {
      $('.listItem6').slideToggle();
    });
    $('.titleMenu7').click(function () {
      $('.listItem7').slideToggle();
    });
    $('.titleMenu8').click(function () {
      $('.listItem8').slideToggle();
    });
    this.thongtinsp.getDatHang().subscribe(dataDatHang => {
      const danhSachSanPham = dataDatHang;
    });
    this.getMonNoiBat();
    this.getCaPhe();
    this.getSocola();
    this.getTraiCay();
    this.getTraDacBiet();
    this.getBanhNgot();
    this.getBanhMan();
    this.getGift();
    this.getMonDaDat();
    this.hienThiTien();
  }

  hienThiTien() {
    this.thongtinsp.getSoTienDaMua().subscribe(data => {
      const arr = data;
      let max = 0;
      arr.forEach(e => {
        if (e.id > max) {
          max = e.id;
        }
      });
      arr.forEach(e => {
        if (e.id === max) {
          const money: GiaTien = {
            sotien: e.sotien,
          };
          this.sotienurl = data;
          this.sotienurl.push(money);
          this.sotienurl = this.sotienurl.slice(this.sotienurl.length - 1, this.sotienurl.length);
        }
      });
      arr.forEach(e => {
        if (e.id === max) {
          this.giaTien = e.sotien;
        }
      });
    });
  }
  // Lấy thông tin thừ server
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

  pay() {
    let temp = 0;
    this.hienMonNoiBat.forEach(e => {
      temp = temp + (+e.price);
      this.giaTien = temp;
    });
    const giatien: GiaTien = {
      sotien: this.giaTien,
    };
    this.thongtinsp.postSoTienDaMua(giatien).subscribe();
    console.log(this.giaTien);
  }
  getMonNoiBat() {
    this.thongtinsp.getMonNoiBat().subscribe(data => {
      this.monNoiBat = data;
    });
  }
  getCaPhe() {
    this.thongtinsp.getCaPhe().subscribe(data => {
      this.caPhe = data;
    });
  }
  getSocola() {
    this.thongtinsp.getSocola().subscribe(data => {
      this.socola = data;
    });
  }
  getTraiCay() {
    this.thongtinsp.getTraiCay().subscribe(data => {
      this.traiCay = data;
    });
  }
  getTraDacBiet() {
    this.thongtinsp.getTraDacBiet().subscribe(data => {
      this.traDacBiet = data;
    });
  }
  getBanhNgot() {
    this.thongtinsp.getBanhNgot().subscribe(data => {
      this.banhNgot = data;
    });
  }
  getBanhMan() {
    this.thongtinsp.getBanhMan().subscribe(data => {
      this.banhMan = data;
    });
  }

  getGift() {
    this.thongtinsp.getGift().subscribe(data => {
      this.gift = data;
    });
  }
  getMonDaDat() {
    this.thongtinsp.getThongTinMonDaDat().subscribe(data => {
      this.hienMonNoiBat = data;
    });
  }
  public themVaoGioHang(id) {
    this.arrIdDatHang.push(id);
    this.thongtinsp.addThemGioHang(this.arrIdDatHang);
    const tatCaMon = [].concat(this.monNoiBat,
      this.caPhe, this.socola, this.banhMan, this.banhNgot, this.gift, this.traiCay, this.traDacBiet);
    const monTimDuoc = tatCaMon.find(mon => mon.id === id);
    if (!monTimDuoc) { return; }
    this.hienMonNoiBat.push(monTimDuoc);
    this.thongtinsp.postThongTinMonDaDat(monTimDuoc).subscribe();
  }
  xoaKhoiGioHang(id) {
    let pos = 0;
    let check = false;
    for (let i = 0; i < this.hienMonNoiBat.length; i++) {
      if (this.hienMonNoiBat[i].id === id) {
        pos = i;
        check = true;
      }
    }
    if (check === true) {
      this.hienMonNoiBat.splice(pos, 1);
      this.thongtinsp.deleteHero(id).subscribe();
    }
  }
}

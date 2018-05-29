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
import { forkJoin } from 'rxjs/observable/forkJoin';

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
    this.fetchInitData();
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
    this.giaTien = this.hienMonNoiBat.reduce((prev, current) => prev + current.numOrder * +(current.price) , 0);
    const giatien: GiaTien = {
      sotien: this.giaTien,
    };
    this.thongtinsp.postSoTienDaMua(giatien).subscribe();
    console.log(this.giaTien);
  }

  public fetchInitData() {
    forkJoin<any[]>(
      this.thongtinsp.getMonNoiBat(),
      this.thongtinsp.getCaPhe(),
      this.thongtinsp.getSocola(),
      this.thongtinsp.getTraiCay(),
      this.thongtinsp.getTraDacBiet(),
      this.thongtinsp.getBanhNgot(),
      this.thongtinsp.getBanhMan(),
      this.thongtinsp.getGift(),
      this.thongtinsp.getThongTinMonDaDat(),
    ).subscribe(([monNoiBat, cafe, socola, traicay, tradatbiet, banhNgot, banhMan, gift, monDadat]) => {
      this.monNoiBat = monNoiBat;
      this.caPhe = cafe;
      this.socola = socola;
      this.traiCay = traicay;
      this.traDacBiet = tradatbiet;
      this.banhMan = banhMan;
      this.banhNgot = banhNgot;
      this.gift = gift;
      this.hienMonNoiBat = monDadat;
    });
  }

  public themVaoGioHang(id) {
    this.arrIdDatHang.push(id);
    this.thongtinsp.addThemGioHang(this.arrIdDatHang);
    const tatCaMon = [].concat(this.monNoiBat,
      this.caPhe, this.socola, this.banhMan, this.banhNgot, this.gift, this.traiCay, this.traDacBiet);
    let monTimDuoc = tatCaMon.find(mon => mon.id === id);
    if (!monTimDuoc) { return; }

    monTimDuoc = Object.assign({}, monTimDuoc, { numOrder: 1 });
    const matchMonDaChonIdx = this.hienMonNoiBat.findIndex(mon => mon.id === monTimDuoc.id);
    if (matchMonDaChonIdx === -1) {
      this.hienMonNoiBat.push(monTimDuoc);
    } else {
      monTimDuoc = Object.assign(monTimDuoc, { numOrder: this.hienMonNoiBat[matchMonDaChonIdx].numOrder + 1 });
      this.hienMonNoiBat[matchMonDaChonIdx] = monTimDuoc;
    }
    this.thongtinsp.postThongTinMonDaDat(monTimDuoc).subscribe();
    // cap nhat gia
    this.pay();
  }

  xoaKhoiGioHang(id) {
    const matchMonIdx = this.hienMonNoiBat.findIndex(mon => mon.id === id);
    if (matchMonIdx === -1) {
      return;
    }
    const wantDecrease = this.hienMonNoiBat[matchMonIdx];
    if (wantDecrease.numOrder <= 1) {
      // delete this item
      this.hienMonNoiBat.splice(matchMonIdx, 1);
      this.thongtinsp.deleteOrder(wantDecrease.id).subscribe();
    } else {
      const newNumOrder = wantDecrease.numOrder - 1;
      this.hienMonNoiBat[matchMonIdx] = Object.assign({}, wantDecrease, { numOrder: newNumOrder });
      this.thongtinsp.updateOrder(id, { numOrder: newNumOrder }).subscribe();
    }
    this.pay();
  }
}

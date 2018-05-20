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
  gift: Gift[];
  hienMonNoiBat: TraDacBiet[] = [];
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
    this.thongtinsp.getDatHang().subscribe(dataDatHang => {
      const danhSachSanPham = dataDatHang;
    });
    this.getMonNoiBat();
    this.getCaPhe();
    this.getSocola();
    this.getTraiCay();
    this.getTraDacBiet();
    this.getGift();


  }


  // Lấy thông tin thừ server
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
            diaChi: e.diachi,
            quanHuyen: e.quanHuyen,
            thanhPho: e.thanhPho
          }
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
      console.log(e.price);
      
    });
    this.giaTien = temp;
    

  }

  // getThongTinKhachHang() {
  // }
  getMonNoiBat() {
    this.thongtinsp.getMonNoiBat().subscribe(data => {
      this.monNoiBat = data;
      // this.hienMonNoiBat = data;
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
  getGift() {
    this.thongtinsp.getGift().subscribe(data => {
      this.gift = data;
    });
  }

  public themVaoGioHang(id) {
    let tinhTien = 0;
    this.arrIdDatHang.push(id);
    this.thongtinsp.addThemGioHang(this.arrIdDatHang);
    console.log(this.arrIdDatHang);
    this.monNoiBat.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
        // console.log(e.name);
        const mon: MonNoiBat = {
          background: e.background,
          price: e.price,
          name: e.name,
          id: e.id,
          title: e.title,
        }
        this.hienMonNoiBat.push(mon);
        // this.hienMonNoiBat = this.hienMonNoiBat.slice(this.hienMonNoiBat.length - 1, this.hienMonNoiBat.length);
      }
    });
    this.caPhe.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
        const mon: MonNoiBat = {
          background: e.background,
          price: e.price,
          name: e.name,
          id: e.id,
          title: e.title,
        }
        this.hienMonNoiBat.push(mon);
      }
    });
    this.socola.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.traiCay.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.traDacBiet.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.gift.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien + (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });

  }
  xoaVaoGioHang(id) {
    let tinhTien = 0;
    this.arrIdDatHang.splice(id);
    this.monNoiBat.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);

      }
    });
    this.caPhe.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.socola.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.traiCay.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.traDacBiet.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    this.gift.forEach(e => {
      if (e.id === id) {
        tinhTien = tinhTien - (+e.price);
        // console.log(`${e.id}-${e.name}-${e.price} = ${tinhTien} K`);
      }
    });
    for (let i = 0; i < this.hienMonNoiBat.length; i++) {
      if (this.hienMonNoiBat[i].id === id) {
        this.hienMonNoiBat.splice(i, 1);
        // console.log(this.hienMonNoiBat[i]);

      }
    }

  }

}

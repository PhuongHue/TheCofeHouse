import { Component, OnInit } from '@angular/core';
import { ThongtinspService } from '../provider/thongtinsp.service';
import { MonNoiBat } from '../interface/monnoibat';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  idDatHang = [];
  arrOrder: MonNoiBat[];

  constructor(
    private thongTinSP: ThongtinspService,
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


}

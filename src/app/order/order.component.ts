import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { ThongTinKH } from '../interface/thongtinkh';
import { ThongtinkhService } from '../provider/thongtinkh.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public isSubmitting = false;

  public form: FormGroup;

  name: '';
  phoneNumber: '';
  mail: '';
  address: '';
  district: '';
  city: '';


  public formErrors = {
    hoten: '',
    sdt: '',
    email: '',
    diachi: '',
    quanhuyen: '',
    thanhpho: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private thongTinKHService: ThongtinkhService,

  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public onSubmit() {
    this.isSubmitting = true;
    this.orderService.order(this.orderForm.value).subscribe(
      () => {
        this.isSubmitting = false;
        // alert('Hãy chọn món !');
      },
      (err) => {
        this.isSubmitting = false;
        if (err.detail) {
          console.log(err.detail);
          Object.keys(err.detail).map((field) => {
            this.formErrors[field] = err.detail[field];
          });
        }
      }
    );
    // console.log(this.orderForm.value);

    // Đưa thông tin của khách hàng từ form lên localhost
    const thongTin: ThongTinKH = {
      hoTen: this.name,
      sdt: this.phoneNumber,
      email: this.mail,
      diaChi: this.address,
      quanHuyen: this.district,
      thanhPho: this.city
    };
    this.thongTinKHService.postThongTinKH(thongTin).subscribe();
    this.thongTinKHService._thongTinKH(thongTin);

  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      hoten: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ]],
      sdt: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      diachi: ['', [
        Validators.required,
      ]],
      quanhuyen: ['', [
        Validators.required,
      ]],
      thanhpho: ['', [
        Validators.required,
      ]],
    });
    this.orderForm.valueChanges.subscribe(() => {
      this.formValidate();
    });
  }

  private formValidate() {
    Object.keys(this.formErrors).map((field) => {
      const formControl = this.orderForm.get(field);
      if (formControl && formControl.dirty && formControl.invalid) {
        this.formErrors[field] = 'Yêu cầu nhập thông tin';
      } else {
        this.formErrors[field] = '';
      }
    });
  }
}

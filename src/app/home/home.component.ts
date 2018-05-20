import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { BinhLuankhService } from '../provider/binhluankh.service';
import { BinhLuanKH } from '../interface/binhluankh';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public homeForm: FormGroup;
  public isSubmitting = false;

  public form: FormGroup;
  name: '';
  mail: '';
  comment: '';

  public formErrors = {
    hoten: '',
    email: '',
    binhluan: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private binhLuanKHService: BinhLuankhService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  public onSubmit() {
    this.isSubmitting = true;
    this.homeService.home(this.homeForm.value).subscribe(
      () => {
        this.isSubmitting = false;
        alert('Gửi Thành công');
        this.homeForm.reset();
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
    const binhLuan: BinhLuanKH = {
      hoTen : this.name,
      email: this.mail,
      binhLuan: this.comment,
    };
    this.binhLuanKHService.postBinhLuanKH(binhLuan).subscribe();
  }

  private buildForm() {
    this.homeForm = this.formBuilder.group({
      hoten: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      binhluan: ['', [
        Validators.required,
      ]]
    });
    this.homeForm.valueChanges.subscribe(() => {
      this.formValidate();
    });
  }

  private formValidate() {
    Object.keys(this.formErrors).map((field) => {
      const formControl = this.homeForm.get(field);
      if (formControl && formControl.dirty && formControl.invalid) {
        this.formErrors[field] = 'Thông tin sai';
      } else {
        this.formErrors[field] = '';
      }
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { OrderService } from './order/order.service';
import { FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MenuService } from './menu/menu.service';
import { HttpClientModule } from '@angular/common/http';

import { ThongtinkhService } from './provider/thongtinkh.service';
import { ThongtinspService } from './provider/thongtinsp.service';
import { BinhLuankhService } from './provider/binhluankh.service';
import { HomeService } from './home/home.service';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    MenuComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    OrderService,
    MenuService,
    HomeService,
    ThongtinkhService,
    ThongtinspService,
    BinhLuankhService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

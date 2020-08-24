import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Config } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get(Config.api + Config.endpoints.product);
  }
  getProductBtCode(code) {
    return this.http.get(Config.api + Config.endpoints.product + `/${code}`);
  }
  getCheckout(codes) {
    return this.http.post(Config.api + Config.endpoints.checkout, codes);
  }
  create(name: string, data: string) {
    return localStorage.setItem(name, data);
  }

  async getLocal() {
    return new Promise(async (resolve) => {
      const car = (localStorage.getItem(Config.cartName)) ? JSON.parse(localStorage.getItem(Config.cartName)) : [];
      resolve(car);
    });
  }
  deleteProduct(code: string) {
    const car = (localStorage.getItem(Config.cartName)) ? JSON.parse(localStorage.getItem(Config.cartName)) : [];
    if (car.length) {
      const findCar = car.find((value) => code === value.product.code);
      const index = car.indexOf(findCar);
      car.splice(index, 1);
    }
    this.create(Config.cartName, JSON.stringify(car));
  }
  deleteTotal() {
    return new Promise(async (resolve) => {
      localStorage.removeItem(Config.cartName);
      if (!localStorage.getItem(Config.cartName)) {
        resolve(true);
      }
    });
  }
  addShoppingCart(product: any, quantity: Number) {
    return new Promise(async (resolve) => {
      const car = (localStorage.getItem(Config.cartName)) ? JSON.parse(localStorage.getItem(Config.cartName)) : [];
      let findCar;
      car.map((value) => {
        if (value.product.code === product.code) {
          value.quantity = (quantity > 1) ? quantity : value.quantity + quantity;
          findCar = value;
        }
      });
      if (!findCar) {
        car.push({product, quantity});
      }
      this.create(Config.cartName, JSON.stringify(car));
      resolve(car);
    });
  }

}


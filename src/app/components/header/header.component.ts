import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.scss']
})
export class HeaderComponent {
  openCar: boolean;
  productsCar: any;
  constructor(private apiService: ApiService, private router: Router) {
    this.productsCar = [];
    this.getCar();
  }
  openCarEvent() {
    this.openCar = !this.openCar;
    this.getCar();
  }
  getCar() {
    this.apiService.getLocal().then((data) => {
      this.productsCar = data;
    });
  }
  deleteProduct(code) {
    this.apiService.deleteProduct(code);
    this.getCar();
  }
  toBuy() {
    this.router.navigate(['checkout']);
  }
  home() {
    this.router.navigate(['/']);
  }
 }

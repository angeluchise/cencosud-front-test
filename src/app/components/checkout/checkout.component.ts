import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../../app.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutResult: any;
  constructor(private apiService: ApiService) {
    this.checkoutResult = {
      product: [],
    };
  }

  async ngOnInit() {
    const products = await this.apiService.getLocal() as any;
    const codes = products.map((product) => {
      return product.product.code;
    });
    this.apiService.getCheckout({codes}).subscribe((data) => {
      this.checkoutResult = data;
      this.apiService.deleteTotal();
    });
  }

}

import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-product',
  templateUrl: './card.component.html',
  styleUrls: ['../../app.component.scss']
})
export class CardComponent {
  @Input() product: any;
  @Input() checkoutView: any;
  constructor(private apiService: ApiService, private toastr: ToastrService) {

  }
  addToCar(product, quality) {
    this.apiService.addShoppingCart(product, quality).then((data) => {
      console.log(data);
      this.toastr.success('al carro de compra', 'Producto agregado');
    });
  }
}

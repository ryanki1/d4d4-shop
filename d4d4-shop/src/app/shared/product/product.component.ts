import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ProductType} from '../product-type.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() productType: ProductType;
  @Input() imgPath: string;
  @Input() txtDescription: string;

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  public routeToProduct() {
    switch (this.productType) {
      case ProductType.Hairclip:
      case ProductType.Dogtag:
      case ProductType.Usbkey:
        this.route.navigateByUrl('/cart');
        break;
      default:
        break;
    }
  }

}

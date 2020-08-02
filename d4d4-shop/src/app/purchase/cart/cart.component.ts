import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../shared/product-type.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public ProductType = ProductType;

  constructor() {
  }

  ngOnInit() {
  }

}

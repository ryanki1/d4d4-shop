import {Component} from '@angular/core';

import {Constants} from '../shared/constants';
import {ProductType} from '../shared/product-type.enum';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public clip = Constants.clip;
  public ProductType = ProductType;
  constructor() {
  }

}

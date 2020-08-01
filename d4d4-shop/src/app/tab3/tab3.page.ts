import {Component} from '@angular/core';

import {Constants} from '../shared/constants';
import {ProductType} from '../shared/product-type.enum';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public usb = Constants.usb;
  public ProductType = ProductType;

  constructor() {
  }

}

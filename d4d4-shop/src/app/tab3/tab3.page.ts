import {Component} from '@angular/core';

import {Constants} from '../shared/constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public usb = Constants.usb;

  constructor() {
  }

}

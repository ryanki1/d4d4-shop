import {Component} from '@angular/core';

import {Constants} from '../shared/constants';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tag = Constants.tag;

  constructor() {
  }

}

import {Component} from '@angular/core';

import {Constants} from '../shared/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public constants = Constants;

  constructor() {
  }

}

import {Component} from '@angular/core';

import {Constants} from '../shared/constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public clip = Constants.clip;

  constructor() {
  }

}

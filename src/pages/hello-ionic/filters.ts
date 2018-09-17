import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: "filters-text",
    templateUrl: 'filters.html' 
  })
  export class FilterPage {
    constructor(public viewCtrl: ViewController) {}
  
    close() {
      this.viewCtrl.dismiss();
    }
  }
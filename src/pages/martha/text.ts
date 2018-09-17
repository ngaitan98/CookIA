import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';

@Component({
    selector: "page-text",
    templateUrl: 'martha.html'
  })
  export class TextModalPage {
    constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController) {
    }
    close() {
      this.navCtrl.pop();
    }
  }
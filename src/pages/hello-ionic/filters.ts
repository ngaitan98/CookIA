import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic'
@Component({
    selector: "filters-text",
    templateUrl: 'filters.html' 
  })
  export class FilterPage {
    vegan: boolean;
    vegetarian: boolean;
    cheap: boolean;
    gluten: boolean;
    healthy: boolean;
    diary: boolean;
    constructor(public viewCtrl: ViewController) {}
    
    close() {
      this.viewCtrl.dismiss();
    }
    filter(){
      console.log(this.vegan);
      let tags = [];
      if(this.vegan)
      {
        tags.push("vegan");
      }
    }
  }
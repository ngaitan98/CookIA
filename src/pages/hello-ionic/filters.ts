import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { NavParams } from 'ionic-angular';

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
    helloIonic: HelloIonicPage;
    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
      this.helloIonic = navParams.get('helloIonic');
    }

    close() {
      this.viewCtrl.dismiss();
    }
    filter(){
      let tags = [];
      if(this.vegan)
      {
        tags.push("vegan");
      }
      if(this.vegetarian)
      {
        tags.push("vegetarian");
      }
      if(this.cheap)
      {
        tags.push("cheap");
      }
      if(this.gluten)
      {
        tags.push("glutenFree");
      }
      if(this.healthy)
      {
        tags.push("healthy");
      }
      if(this.diary)
      {
        tags.push("diaryFree");
      }
      this.helloIonic.filterBy(tags);
      this.close();
      console.log(tags);
    }
  }
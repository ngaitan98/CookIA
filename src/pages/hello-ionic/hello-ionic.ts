import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage { 
    selectedItem: any;
    items: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
      let localData = this.http.get('assets/recipees.json').map(res => res.json().data);
        localData.subscribe(data => {
          this.items = data;
        });
    }
    itemTapped(event, item) {
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      });
  }
}

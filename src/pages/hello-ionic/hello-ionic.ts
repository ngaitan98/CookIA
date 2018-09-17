import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { ListeningPage } from '../martha/listening';
import { Http} from '@angular/http';
import { PopoverController } from 'ionic-angular';
import { TextModalPage } from '../martha/text'

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage { 
    selectedItem: any;
    items: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, 
      private http: Http, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
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
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ListeningPage);
    popover.present({
      ev: myEvent
    });
  }
  presentMartha() {
    let profileModal = this.modalCtrl.create(TextModalPage, { userId: 8675309 });
    profileModal.present();
  }
}

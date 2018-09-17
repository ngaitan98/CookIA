import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { ListeningPage } from '../martha/listening';
import { Http} from '@angular/http';
import { PopoverController } from 'ionic-angular';
import { TextModalPage } from '../martha/text'
import { FilterPage } from '../hello-ionic/filters'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage { 
    selectedItem: any;
    items: any[];
    filters: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams, 
      private http: Http, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
      let localData = this.http.get('assets/recipees.json').map(res => res.json().data);
        localData.subscribe(data => {
          this.items = data;
          this.filters = this.items;
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
  presentFiletrs(myEvent)
  {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
      ev: myEvent
    });
  }
  filterBy(filters){
    
  }
}

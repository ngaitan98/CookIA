import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { ListeningPage } from '../martha/listening';
import { TextModalPage } from '../martha/text'


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
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

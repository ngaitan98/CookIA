import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'


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
  presentMartha() {
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
    profileModal.present();
  }
}

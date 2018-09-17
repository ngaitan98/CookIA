import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ListeningPage } from '../martha/listening';
import { ModalController } from 'ionic-angular';
import { TextModalPage } from '../martha/text'
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  constructor(public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
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
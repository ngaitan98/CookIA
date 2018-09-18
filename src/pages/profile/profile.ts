import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  constructor(public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
  }
  presentMartha() {
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
    profileModal.present();
  }
}
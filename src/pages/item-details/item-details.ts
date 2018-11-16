import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from 'angularfire2/firestore';


import { RecipesProvider } from '../../providers/recipes/recipes';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController, private fireStore: AngularFirestore, private rp: RecipesProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
  presentMartha() {
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309, recipe: this.selectedItem });
    profileModal.present();
  }

  addFavorita(id: number, nombre: string) {
    let priority = 5;

    this.fireStore.collection('/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas/').add({ id, priority, nombre }).then(
      newItem => {
        console.log("exitoso")
      }).catch((error) => {
        console.log("error")
      })
    priority++;
  }
}

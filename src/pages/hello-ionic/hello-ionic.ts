import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ModalController, SelectPopover} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { PopoverController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'
import { FilterPage } from '../hello-ionic/filters'
import 'rxjs/add/operator/map';
import { RecipesProvider } from '../../providers/recipes/recipes'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage { 
    selectedItem: any;
    filters: any[];
    data: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, 
        public popoverCtrl: PopoverController, public modalCtrl: ModalController,
        public recipesProvider: RecipesProvider) {
         this.loadRecipes();
    }
    itemTapped(event, item) {
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      });
  }
  presentMartha() {
      let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
      profileModal.present();
  }

      presentFiletrs(myEvent) {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
      ev: myEvent
    });
  }

  filterBy(filters){
    
  }
  loadRecipes(){
    this.recipesProvider.randomRecipes()
        .then(recipes => {
          this.data = recipes;
          console.log(this.data);
    });
  }
}

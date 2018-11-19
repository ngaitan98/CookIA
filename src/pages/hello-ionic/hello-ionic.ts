import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, SelectPopover } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
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
    let popover = this.popoverCtrl.create(FilterPage,{ helloIonic: this });
    popover.present({
      ev: myEvent
    });
  }

  public filterBy(filters) {
    this.recipesProvider.filterBy(filters)
      .then(recipes => {
        this.data = recipes;
        console.log(this.data);
      });
  }

  findRecipes(search: string) {
    this.recipesProvider.findRecipes(search)
      .then(recipes => {
        this.data = recipes;
        console.log(this.data);
      });
  }

  loadRecipes() {
    this.recipesProvider.randomRecipes()
      .then(recipes => {
        this.data = recipes;
        console.log(this.data);
      });
  }

  filterRandomRecipesPreparationTime(minutes: number) {
    return this.recipesProvider.fiterRandomByPreparationTime(minutes, this.recipesProvider.randomRecipes());
  }

  filterSearchPreparationTime(minutes: number, search: string) {
    return this.recipesProvider.filterSearchByPreparationTime(minutes, this.recipesProvider.findRecipes(search));
  }
  startRecipe(event, item){
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309,  recipe: item});
    profileModal.present();
  }
}

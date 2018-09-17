import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    template: `
      <ion-item>
      <h3>
        Di algo
      </h3>
      <img src = "assets/imgs/digital_audio.gif">
      </ion-item>
      <button ion-button color="secondary" round small float-right (click) = "close()">
        Enviar
      </button>
    `
  })
  export class ListeningPage {
    constructor(public viewCtrl: ViewController) {}
  
    close() {
      this.viewCtrl.dismiss();
    }
  }
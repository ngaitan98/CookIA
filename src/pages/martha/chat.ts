import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';

@Component({
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {

  messages: Array<{ message: string, user: string }>;
  text = 'asdfskdjfh';

  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController) {
    this.messages = [];
    for (let i = 0; i < 10; i++) {
      var user = "user"
      if(i%2 == 0){
        user = "martha";
      }
      this.messages.push({
        message: i + "",
        user: user
      })
    }
  }

  close() {
    this.navCtrl.pop();
  }


}

//   import { Component } from '@angular/core';
// import { ViewController } from 'ionic-angular';

// @Component({
//     template: `
//       <ion-item>
//       <h3>
//         Di algo
//       </h3>
//       <img src = "assets/imgs/digital_audio.gif">
//       </ion-item>
//       <button ion-button color="secondary" round small float-right (click) = "close()">
//         Enviar
//       </button>
//     `
//   })
//   export class ListeningPage {
//     constructor(public viewCtrl: ViewController) {}

//     close() {
//       this.viewCtrl.dismiss();
//     }
//   }
import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';

@Component({
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {

  messages: Array<{message: string, user: string }>;
  text = 'asdfskdjfh';

  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController) {
    this.messages = [];
      this.messages.push({
        message: "Hola, ¿En qué te puedo ayudar?",
        user: "martha"
      })
      this.messages.push({
        message: "Quiero cocinar algo",
        user: "user"
      })
      this.messages.push({
        message: "¿Ya tienes pensado qué cocinar o te ayudo a decidir?",
        user: "martha"
      })
      this.messages.push({
        message: "Ayúdame",
        user: "user"
      })
      this.messages.push({
        message: "¿Qué ingredientes tienes disponibles?",
        user: "martha"
      })
      this.messages.push({
        message: "Pollo, pasta, arroz, tomate...",
        user: "user"
      })
      this.messages.push({
        message: "De acuerdo, déjame ver qué recetas tengo...",
        user: "martha"
      })  
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
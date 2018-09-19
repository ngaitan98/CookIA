import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { AssistantV1 } from 'watson-developer-cloud'
import { SpeechToTextV1 } from 'watson-developer-cloud'
// import { SpeechRecognition } from '@ionic-native/speech-recognition'
@Component({
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {

  input: string = "";

  messages =  new Array;

  responses = new Array;

  assistant = new AssistantV1({
    username: 'fef7674c-b975-40c8-ae80-b268f7fae27b',
    password: 'r3k6OGkccEvm',
    version: '2018-07-10'
  });

  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController, /*private speechRecogition: SpeechRecognition*/) {

  }

  sendMessage(input : string) {
    this.messages.push({message: input, user: "user"});
    this.assistant.message({
      workspace_id: '0085a1ac-00fb-457a-a85c-3afa3c2ce5e7',
      input: { 'text': this.input }
    }, (err, response) => {
      if (err)
        console.log('error:', err);
      else {
        this.responses.push(response);
        var str : string
        response.output.text.forEach(message => {
          str = message + "\n"
          // this.messages.push({message : message, user: "martha"})  
        });
        this.messages.push({message : str, user : "martha"})
        console.log(JSON.stringify(this.messages[this.messages.length-1], null, 2))
        console.log(JSON.stringify(this.responses[this.responses.length-1], null, 2))
      }
    });
  }

  close() {
    this.navCtrl.pop();
  }
}
import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { AssistantV1 } from 'watson-developer-cloud'
import { SpeechToTextV1 } from 'watson-developer-cloud'
import {ApiAiClient} from "api-ai-javascript/es6/ApiAiClient";

const client = new ApiAiClient({accessToken: '3da16c80a8e44c2a9f3c98d49ff40d67'});

// import { SpeechRecognition } from '@ionic-native/speech-recognition'
@Component({
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {
  
  input: string = "";

  messages =  new Array;

  responses = new Array;


  //assistant = new ApiAiClient({accessToken: "3da16c80a8e44c2a9f3c98d49ff40d67"});
  
  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController, /*private speechRecogition: SpeechRecognition*/) {
    
  }

  sendMessage(input : string) {
    this.messages.push({message:input, user:'user'});
    client.textRequest(input)
    .then((response) => {
      console.log(response);
      this.responses.push(response);
      var str = response.result.fulfillment.speech;
      this.messages.push({message:str, user:'martha'});
        
    })
    .catch((error) => {/* do something here too */})
  }

  close() {
    this.navCtrl.pop();
  }
}
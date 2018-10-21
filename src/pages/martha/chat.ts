import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Content, NavController } from 'ionic-angular';
import { AssistantV1 } from 'watson-developer-cloud'
import { SpeechToTextV1 } from 'watson-developer-cloud'
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { log } from 'util';
import { log } from 'util';
import { log } from 'util';
import {ApiAiClient} from "api-ai-javascript/es6/ApiAiClient";
import { RecipesProvider } from '../../providers/recipes/recipes'

const client = new ApiAiClient({accessToken: '3da16c80a8e44c2a9f3c98d49ff40d67'});
const INTEND_ASK_FOR_SERVICE = "Ask for service";
const INTEND_SEARCH_BY_RECIPE_NAME = "Search by recipe name";
const INTEND_SEARCH_BY_INGREDIENT_NAME = "Search by ingredient name";
const INTEND_NUMBER_SELECTED = "Number selected";
const INTEND_NEXT_STEP = "Next step";
const recipesProvider = new RecipesProvider();
// import { SpeechRecognition } from '@ionic-native/speech-recognition'
@Component({
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {
  
  input: string = "";

  messages =  new Array;

  responses = new Array;

  temporalRecipes = new Array;

  temporalSteps = new Array;

  temporalCurrentStep = 0;
  @ViewChild(Content) content: Content;
  //assistant = new ApiAiClient({accessToken: "3da16c80a8e44c2a9f3c98d49ff40d67"});
  
  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController, public recipesProvider: RecipesProvider/*private speechRecogition: SpeechRecognition*/) {
    
  }

  

  sendMessage(input : string) {
    this.messages.push({message:input, user:'user'});
    this.scrollToBottom();
    
    client.textRequest(input)
    .then((response) => {
      console.log(response);
      this.responses.push(response);
      var str = response.result.fulfillment.speech;
      this.messages.push({message:str, user:'martha'});
      if(response.result.metadata.intentName==INTEND_SEARCH_BY_RECIPE_NAME){
        var food = response.result.parameters.food_list;
        this.recipesProvider.findRecipes(food).then(recipes =>{
          str = 'Please choose a number:\n';
          this.temporalRecipes=recipes.results;
          for(var i=0;i<3;i++){
            str+= (i+1)+'. '+recipes.results[i].title+'\n';
          }
          this.messages.push({message:str, user:'martha'});
          console.log(str);
          return str;
        });
      }
      else if(response.result.metadata.intentName==INTEND_NUMBER_SELECTED){
        var number = response.result.parameters.number-1;
        if(number!=="undefined"){
          var recipe = this.temporalRecipes[number];
          this.recipesProvider.recipeInstructions(recipe.id).then(instructions =>{
            console.log(instructions);
              this.temporalSteps = instructions[0].steps;
              var str = this.temporalCurrentStep +1 + '. '+this.temporalSteps[this.temporalCurrentStep].step;
              this.messages.push({message:str, user:'martha'});
          });
        }
      }
      else if(response.result.metadata.intentName==INTEND_NEXT_STEP){
        this.temporalCurrentStep++;
        var str = this.temporalCurrentStep +1 + '. '+this.temporalSteps[this.temporalCurrentStep].step;
        this.messages.push({message:str, user:'martha'});
      }
      else if(response.result.metadata.intentName==INTEND_SEARCH_BY_INGREDIENT_NAME){
        
        
      }
      this.scrollToBottom();
    })
    .catch((error) => {/* do something here too */})
   
  }

  keyPressHandler(keyCode, m) {
    //console.log("keyPressHandler", keyCode);
    // Pressed enter key.
    if (keyCode == 13) {
      this.sendMessage(m);
      this.input = '';
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }


  close() {
    this.navCtrl.pop();
  }
}
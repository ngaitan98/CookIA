import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Content, NavController, Platform } from 'ionic-angular';
import { ApiAiClient } from "api-ai-javascript/es6/ApiAiClient";
import { RecipesProvider } from '../../providers/recipes/recipes'
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech,TTSOptions } from '@ionic-native/text-to-speech';
import { stringify } from '@angular/compiler/src/util';

const client = new ApiAiClient({ accessToken: '80a4a758532947068f3787f95241b510' });
const INTEND_ASK_FOR_SERVICE = "Ask for service";
const INTEND_SEARCH_BY_RECIPE_NAME = "Search by recipe name";
const INTEND_SEARCH_BY_INGREDIENT_NAME = "Search by ingredient name";
const INTEND_NUMBER_SELECTED = "Number selected";
const INTEND_NEXT_STEP = "Next step";
const INTEND_YES_CONFIRMATION = "YES confirmation";
const INTEND_RECOMMEND_A_RECIPE = "Recommend a recipe";
const INTEND_ASK_THE_INGREDIENTS_OF_A_RECIPE = "Ask the ingredients of a recipe";
// import { SpeechRecognition } from '@ionic-native/speech-recognition'
@Component({
  
  selector: "page-chat",
  templateUrl: 'martha.html'
})
export class ChatPage {

  matches: string[];
  isRecording= false;

  input: string = "";



  messages = new Array;

  responses = new Array;

  temporalRecipes = new Array;

  temporalRecipe;

  temporalSteps = new Array;

  temporalCurrentStep = 0;
  @ViewChild(Content) content: Content;
  //assistant = new ApiAiClient({accessToken: "3da16c80a8e44c2a9f3c98d49ff40d67"});

  constructor(public viewCtrl: ViewController, public params: NavParams, public navCtrl: NavController, public recipesProvider: RecipesProvider, private speechRecognition: SpeechRecognition,private plt: Platform, private cd: ChangeDetectorRef,
    private textToSpeech: TextToSpeech) {

  }


  async sayText(text: string){
    try{
      const options: TTSOptions=
      {
        text,
        rate:1
      }
      const speech=await this.textToSpeech.speak(options);
    }
    catch(e){
      console.error(e);
    } 

  }
  async stopSpeaking()
  {
    try{
      await this.textToSpeech.stop();
    }
    catch(e){
      console.error(e);

    }
  } 



  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      this.sendMessage(this.matches[0]);
      this.cd.detectChanges();
      this.scrollToBottom();
    });
    this.scrollToBottom();
    this.isRecording = true;
    this.input = '';
    this.scrollToBottom();

  }



  sendMessage(input: string) {
    this.messages.push({ message: input, user: 'user' });
    this.scrollToBottom();

    client.textRequest(input)
      .then((response) => {
        this.sayText(response.result.fulfillment.speech);
        console.log(response.result.fulfillment.speech);
       this.responses.push(response);
        var str = response.result.fulfillment.speech;
        this.messages.push({ message: str, user: 'martha' });
        if (response.result.metadata.intentName == INTEND_SEARCH_BY_RECIPE_NAME) {
          var food = response.result.parameters.food_list;
          this.recipesProvider.findRecipes(food).then( recipes => {
            str = 'Please choose a number:\n';
            
            this.temporalRecipes = recipes['results'];
            for (var i = 0; i < 3; i++) {
              str += (i + 1) + '. ' + this.temporalRecipes[i].title + '\n';
            }
            
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
     console.log(str);
            this.scrollToBottom();
          });
        }
        else if (response.result.metadata.intentName == INTEND_NUMBER_SELECTED) {
          var number = response.result.parameters.number - 1;
          this.temporalRecipe = this.temporalRecipes[number];
          console.log(this.temporalRecipe);
          str = 'These are the ingredients. Do you have them all?';
          this.messages.push({ message: str, user: 'martha' });
          this.sayText(str);
          str='';
          this.recipesProvider.recipeInformation(this.temporalRecipe.id).then(info=>{
            var ingredients = info['extendedIngredients'];
            console.log(ingredients);
            for(var i =0;i<ingredients.length;i++){
              str+= (i+1) + '. ' +ingredients[i].measures.metric.amount +' ' +ingredients[i].measures.metric.unitShort+' of '+ingredients[i].name +'\n';
            } 
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
            this.scrollToBottom();
          });
         
        }
        else if(response.result.metadata.intentName == INTEND_YES_CONFIRMATION){
          this.recipesProvider.recipeInstructions(this.temporalRecipe.id).then(instructions => {
            this.temporalSteps = instructions[0].steps;
            str = this.temporalCurrentStep + 1 + '. ' + this.temporalSteps[this.temporalCurrentStep].step;
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
            this.scrollToBottom();
          });
        }
        else if (response.result.metadata.intentName == INTEND_NEXT_STEP) {
          this.temporalCurrentStep++;
          if (this.temporalCurrentStep < this.temporalSteps.length) {
            str = this.temporalCurrentStep + 1 + '. ' + this.temporalSteps[this.temporalCurrentStep].step;
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
          }
          else {
            this.messages.push({ message: 'You have finished!', user: 'martha' });
            this.sayText(str);
          }
          this.scrollToBottom();
        }
        else if (response.result.metadata.intentName == INTEND_RECOMMEND_A_RECIPE) {
          if(response.result.parameters.food_type !== ""){
            var tipo = 'type='+response.result.parameters.food_type;
            this.recipesProvider.filteredRandomRecipes([tipo]).then(recipes => {
              console.log(recipes['recipes']);
              str = 'Please choose a number:\n';
              this.temporalRecipes = new Array;
              for (var i = 0; i < 3; i++) {
                this.temporalRecipes.push(recipes['recipes'][i]);
                str += (i + 1) + '. ' + this.temporalRecipes[i].title + '\n';
              }
              this.messages.push({ message: str, user: 'martha' });
              this.sayText(str);
            console.log(str);
            this.scrollToBottom();
            });
          }
          
        }
        else if (response.result.metadata.intentName == INTEND_ASK_THE_INGREDIENTS_OF_A_RECIPE) {
          str='';
          var recipe_name = response.result.parameters.food;
          var recipe_id = 0;
          this.recipesProvider.findRecipes(recipe_name).then(recipes=>{
            recipe_id=recipes['results'][0].id;
            console.log(recipes);
            str ='Recipe name: '+recipes['results'][0].title;
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
            str='';
            this.recipesProvider.recipeInformation(recipe_id).then(info => {
              var ingredients = info['extendedIngredients'];
              for(var i =0;i<ingredients.length;i++){
                str+= (i+1) + '. ' +ingredients[i].measures.us.amount +' ' +ingredients[i].measures.us.unitLong+' of '+ingredients[i].name +'\n';
                console.log(ingredients[i].measures.us.amount);
              } 
              this.messages.push({ message: str, user: 'martha' });
              this.sayText(str);

            });
          });
          
        }
        else if (response.result.metadata.intentName == INTEND_SEARCH_BY_INGREDIENT_NAME) {
          var ingredients = response.result.parameters.ingredients;
          this.recipesProvider.findRecipesIngredients(ingredients).then(recipes => {
            str = 'Please choose a number:\n';
            this.temporalRecipes = new Array;
            for (var i = 0; i < 3; i++) {
              this.temporalRecipes.push(recipes[i]);
              str += (i + 1) + '. ' + recipes[i].title + '\n';
            }
            this.messages.push({ message: str, user: 'martha' });
            this.sayText(str);
            console.log(str);
            this.scrollToBottom();

          });
        }
        this.scrollToBottom();
      })
      .catch((error) => {/* do something here too */ })
      this.input = '';
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
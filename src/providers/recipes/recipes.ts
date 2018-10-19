import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RecipesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipesProvider {

  data: any;

  apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com"

  options = {headers : new HttpHeaders({
    'X-Mashape-Key' : 'nWRzp0wBBKmshvLpaNymy5mPvUyHp1HEanjjsncnm323F301Ih',
    'Accept' : 'application/json'
  })};


  constructor(public http: HttpClient) {
    
  }

  public quickAnswer(question: string) {
    let q = encodeURIComponent(question);
    q = q.replace("%20", "+");
    return this.makeHttpRequest(this.apiUrl + '/recipes/quickAnswer?q=' + q );
  }


  public findRecipes(name: string, diet?: string, excludedIngredients?: string[], intolerances?: string[]) {
    if(diet === undefined) {
      diet = ""
    }
    let excludedStr = "";
    if(excludedIngredients !== undefined) {
      excludedStr = this.arrayToUriList(excludedIngredients);
    }
    let intolerancesStr = "";
    if(intolerances !== undefined) {
      intolerancesStr = this.arrayToUriList(intolerances);
    }
    return this.makeHttpRequest(this.apiUrl + '/recipes/search?diet=' + diet + '&excludedIngredients=' + excludedStr  + '&instructionsRequired=true&intolerances=' + intolerancesStr + '&imitLicense=true&number=20&query=' + name)
  }

  public findRecipesIngredients(ingredients: string[]) {
    //fillIngredients: add info about ingredients in each recipe
    //limitLicence: only show recipes with atribution licence, if those are requested later, they will have instructions
    //number: number of recipes in response
    //ranking: maximize used ingredients(1) or minimize missing ingredients(2)
    return this.makeHttpRequest(this.apiUrl + '/recipes/findByIngredients?fillIngredients=false&ingredients=' + this.formatListUri(ingredients) + "&limitLicence=true&number=20&ranking=2")
  }

  public summarizeRecipe(recipeId: number) {
    return this.makeHttpRequest(this.apiUrl + '/recipes/' + recipeId + '/summary')
  }

  public recipeInstructions(recipeId: number) {
    //stepBreakdown: break down the recipe steps even more
    return this.makeHttpRequest(this.apiUrl + '/recipes/' + recipeId + '/analyzedInstructions?stepBreakdown=true')
  }

  public findSimilarRecipes(recipeId: number) {
    return this.makeHttpRequest(this.apiUrl + '/recipes/' + recipeId + '/similar')
  }

  public filteredRandomRecipes(tags: string[]) {
    this.formatListUri(tags);
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
      if(i < tags.length - 1){
        tagsStr += tags[i] + '&2C';
      }
      else {
        tagsStr += tags[i];
      }
    }
    return this.makeHttpRequest(this.apiUrl + '/recipes/random?limitLicense=false&number=20&tags=' + tagsStr);
  }

  public randomRecipes() {
    return this.makeHttpRequest(this.apiUrl + '/recipes/random?limitLicense=false&number=20&');
  }

  private makeHttpRequest(uri: string) {
    return new Promise( resolve => {
      this.http.get(uri, this.options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  private arrayToUriList(strings: string[]) {
    let string = '';
    for (let i = 0; i < strings.length; i++) {
      if(i < strings.length - 1){
        string += strings[i] + '&2C';
      }
      else {
        string += strings[i];
      }
    }
    return string;
  }

  private formatListUri(strings: string[]) {
    return this.arrayToUriList(strings).replace(" ", "+");
  }

}

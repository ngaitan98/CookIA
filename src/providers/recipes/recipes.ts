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

  public findRecipesName(name: string) {
    return this.makeHttpRequest(this.apiUrl+ '/recipes/search?instructionsRequired=true&query=' + name)
  }

  public randomRecipes(tags: string[]) {
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
      if(i < tags.length - 1){
        tagsStr += tags[i] + '&2C'
      }
      else {
        tagsStr += tags[i]
      }
    }
    return this.makeHttpRequest(this.apiUrl + 'recipes/random?limitLicense=true&number=20&tags=' + tagsStr)
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

  private removeSpaces(strings: string[]) {
    for(let i = 0; i < strings.length; i++) {
      strings[i] = strings[i].replace(" ", "+");
    }
    return strings
  }

}

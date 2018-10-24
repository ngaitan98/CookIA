import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
Generated class for the RecipesProvider provider.
See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class RecipesProvider {

	private types = {
		'main course': 'main course',
		'side dish': 'side dish',
		'dessert': 'dessert',
		'appetizer': 'appetizer',
		'salad': 'salad',
		'bread': 'bread,',
		'breakfast': 'breakfast',
		'soup': 'soup',
		'beverage': 'beverage',
		'sauce': 'sauce',
		'drink': 'drink'
	};

	private diets = {
		'pescetarian': 'pescetarian',
		'lacto vegetarian': 'lacto vegetarian',
		'ovo vegetarian': 'ovo vegetarian',
		'vegan': 'vegan',
		'vegetarian': 'vegetarian'
	};

	private intolerances = {
		'dairy': 'dairy',
		'egg': 'egg',
		'gluten': 'gluten',
		'peanut': 'peanut',
		'seasame': 'sesame',
		'seafood': 'seafood',
		'shellfish': 'shellfish',
		'soy': 'soy',
		'sulfite': 'sulfite',
		'tree nut': 'tree nut',
		'wheat': 'wheat'
	};

	private data: any;

	private apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com"

	private options = {
		headers: new HttpHeaders({
			'X-Mashape-Key': 'nWRzp0wBBKmshvLpaNymy5mPvUyHp1HEanjjsncnm323F301Ih',
			'Accept': 'application/json'
		})
	};

	constructor(public http: HttpClient) {

	}

	public getTypes() {
		return this.types;
	}

	public getDiets() {
		return this.diets;
	}

	public getIntolerances() {
		return this.intolerances;
	}

	public findRecipes(query: string, diet?: string, type?: string, excludedIngredients?: string[], intolerances?: string[]) {
		let uri = this.apiUrl + '/recipes/search?instructionsRequired=true&limitLicense=true&number=20&query=' + encodeURIComponent(query);
		if (diet !== undefined) {
			uri += "&diet=" + encodeURIComponent(diet);
		}
		if (type !== undefined) {
			uri + '&type' + encodeURIComponent(type);
		}
		if (excludedIngredients !== undefined) {
			uri += '&excludedIngredients' + this.arrayToUriList(excludedIngredients);
		}
		if (intolerances !== undefined) {
			uri += '&intolerances' + this.arrayToUriList(intolerances);
		}
		return this.makeGetRequest(uri);
	}

	public findRecipesIngredients(ingredients: string[]) {
		//fillIngredients: add info about ingredients in each recipe
		//limitLicence: only show recipes with atribution licence, if those are requested later, they will have instructions
		//number: number of recipes in response
		//ranking: maximize used ingredients(1) or minimize missing ingredients(2)
		return this.makeGetRequest(this.apiUrl + '/recipes/findByIngredients?fillIngredients=false&ingredients=' + this.formatListUri(ingredients) + "&limitLicence=true&number=20&ranking=2");
	}

	public summarizeRecipe(recipeId: number) {
		return this.makeGetRequest(this.apiUrl + '/recipes/' + recipeId + '/summary');
	}

	public recipeInstructions(recipeId: number) {
		//stepBreakdown: break down the recipe steps even more
		return this.makeGetRequest(this.apiUrl + '/recipes/' + recipeId + '/analyzedInstructions?stepBreakdown=true');
	}

	public recipeInformation(recipeId: number) {
		return this.makeGetRequest(this.apiUrl + '/recipes/' + recipeId + '/information');
	}

	public findSimilarRecipes(recipeId: number) {
		return this.makeGetRequest(this.apiUrl + '/recipes/' + recipeId + '/similar');
	}

	public quickAnser(question: string) {
		return this.makeGetRequest(this.apiUrl + '/recipes/quickAnswer?q=' + encodeURIComponent(question));
	}

	public ingredientSubstituteByName(ingredientName: string) {
		return this.makeGetRequest(this.apiUrl + '/food/ingredients/substitutes?ingredientName=' + encodeURIComponent(ingredientName));
	}

	public ingredientSubstituteById(ingredientId: number) {
		return this.makeGetRequest(this.apiUrl + '/food/ingredients/' + ingredientId + '/substitutes');
	}

	public joke() {
		return this.makeGetRequest(this.apiUrl + '/food/jokes/random')
	}

	public filteredRandomRecipes(tags: string[]) {
		return this.makeGetRequest(this.apiUrl + '/recipes/random?limitLicense=true&number=20&tags=' + this.formatListUri(tags));
	}	

	public randomRecipes() {
		return this.makeGetRequest(this.apiUrl + '/recipes/random?limitLicense=true&number=20');
	}
	
	public fiterRandomByPreparationTime(minutes: number, promise: Promise<{}>) {
		let json: any;
		let recipes = []
		promise.then(response => {
			json = response;
			for (let recipe of json.recipes) {
				if (recipe.readyInMinutes <= minutes) {
					recipes.push(recipe);
				}
			}
		});
		return recipes;
	}

	public filterSearchByPreparationTime(minutes: number, promise: Promise<{}>) {
		let json: any;
		let recipes = []
		promise.then(response => {
			json = response;
			for(let recipe of json.results) {
				if(recipe.readyInMinutes <= minutes) {
					recipes.push(recipe);
				}
			}
		});
		console.log(recipes);
		return recipes;
	}

	private makeGetRequest(uri: string) {
		return new Promise(resolve => {
			this.http.get(uri, this.options).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}
	public filterBy(tags: string[]) {
		let tagsStr = '';
		for (let i = 0; i < tags.length; i++) {
		  if(i < tags.length - 1){
			tagsStr += tags[i] + '&2C'
		  }
		  else {
			tagsStr += tags[i]
		  }
		}
		return this.makeGetRequest(this.apiUrl + '/recipes/random?limitLicense=true&number=20&tags=' + tagsStr)
	  }
	private arrayToUriList(strings: string[]) {
		let string = '';
		for (let i = 0; i < strings.length; i++) {
			if (i < strings.length - 1) {
				string += strings[i] + ',';
			}
			else {
				string += strings[i];
			}
		}
		return string;
	}

	private formatListUri(strings: string[]) {
		return encodeURIComponent(this.arrayToUriList(strings));
	}

}

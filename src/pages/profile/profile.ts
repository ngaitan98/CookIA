import { Component } from '@angular/core';
import { PopoverController, Item, GESTURE_ITEM_SWIPE, NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,  } from 'angularfire2/firestore';


import { RecipesProvider } from '../../providers/recipes/recipes';
import { Observable } from  'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  personaCollection: AngularFirestoreCollection<persona>;
  persona1Collection: AngularFirestoreDocument<persona>;
  



  person: Observable<persona[]>;
  person1: Observable<persona>;

  userDoc: AngularFirestoreDocument<persona>;
 user: persona;



 canReorder: boolean =false;
  favoritasCollection: AngularFirestoreCollection<receta>;
   favoritas: receta[];  
  data: any;
  usuario:string;
  correo: string;
  telefono: string;
  titulo: string;
  nombres_recetas: any[];
  favoritasTitulo: receta_titulo[];

  ///nuevas//////
data2:any;  

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public modalCtrl: ModalController,
    private fireStore: AngularFirestore,private rp: RecipesProvider ) { 
 }
  
  ionViewDidEnter(){
  this.personaCollection = this.fireStore.collection('usuarios');
  this.person = this.personaCollection.valueChanges();

  


  
this.favoritasCollection = this.fireStore.collection('/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas',ref => ref.orderBy('priority'));
this.favoritasCollection.snapshotChanges().subscribe( recetaList => {
  this.favoritas= recetaList.map (item =>{




return {

  id :item.payload.doc.data().id,
  priority:item.payload.doc.data().priority,
  id_2: item.payload.doc.id,
  nombre: item.payload.doc.data().nombre



        }
  })
});



this.userDoc = this.fireStore.doc('/usuarios/MoVql64VQQ4P5OHrtY2l');
this.userDoc.snapshotChanges().subscribe(
  item =>{
         this.correo=item.payload.data().correo;
         this.usuario= item.payload.data().usuario;
         this.telefono=item.payload.data().telefono;
         
    } );  
} 
    
  
 


  
  
  
reorderItems(indexes: any) {
 if(this.canReorder)
    {
     let batch= this.fireStore.firestore.batch();

     let element = this.favoritas[indexes.from];
     this.favoritas.splice(indexes.from,1);
     this.favoritas.splice(indexes.to,0,element);    
   
     this.favoritas.forEach((item: receta, index:number )=> {
      if(item.priority != index){
     let ref= this.fireStore.doc(`/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas/${item.id_2}`).ref;
        batch.update(ref, { priority: index });
   }
    });
   
   
   batch.commit().then(() =>{

    console.log('lista reordenada');
   }).catch(err =>{
    console.error('lista rror');
   }); 
    }
}

delete(id2:number){
  console.log(`/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas/${id2}`)
this.fireStore.doc(`/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas/${id2}`).delete().then(() =>{
console.log('vaina eliminada');
console.log()
}).catch(err =>{
console.error(err);
})
}

spoon(id:number)
{

  //this.rp.recipeInformation(recipeId);
  this.rp.recipeInformation(id)
  .then(recipes => {
    this.data2 = recipes;
 
      this.navCtrl.push(ItemDetailsPage, {
        item: this.data2,
        faved: true
      });
    
    console.log(this.data2);
  });

  console.log(this.data2);
 // this.navCtrl.push(ItemDetailsPage, {
   // item:this.data2
  //});


  //this.rp.randomRecipes()
 // .then(recipes => {
  //  this.data2 = recipes;
   // console.log(this.data2);
  ///});

}

  presentMartha() {
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
    profileModal.present();
  }

 // loadRecipes(id:number)

   // this.rp.summarizeRecipe(id)
   //  .then((recipe) => {
     //     this.data = recipe;
      ///     this.titulo= this.data.title;
     ///      console.log(this.titulo);
   //         return this.data.title;
    //       });
  //}


 loadRecipes(id:number){
  this.rp.summarizeRecipe(id)
   .then((recipe) => {
       this.data = recipe;
       this.titulo= this.data.title;
       //this.funcion_llamada(this.data)
       console.log(this.titulo);
       return this.data.title;
         }).then( (titulo)=>{
          

         }
           
         )
         ;
  }






function_calback()
{
 // this.nombres_recetas.push(this.titulo);
  //console.log(this.nombres_recetas.length);
}




function_whatever(id: number){

  this.metodo(id,this.function_calback());
}
  metodo(id: number,fun){
    console.log(this.titulo);
    this.rp.summarizeRecipe(id)
    .then((recipe) => {
        this.data = recipe;
        this.titulo= this.data.title;
        console.log(this.titulo);
          });
         console.log("off"); 
    
  }




addFavorita(id: number)
{
let priority=0;

if(this.favoritas.length>0){
  let last= this.favoritas.length-1;
  priority=this.favoritas[last].priority+1
}
this.fireStore.collection('/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas/').add({id,priority}).then(
  newItem =>{console.log("exitoso")
  }).catch((error)=>{
    console.log("error")
  })

}

confirmar(id:number)
{
 var conf=true;



}

}







interface receta
{
  id: number;
  priority: number;
    id_2: string;
    nombre:string;
}

interface receta_titulo
{
tit: string;


}

interface persona{
  correo: string;
  prueba: string;
  telefono: string;
  usuario: string;
  id: string;
  }
  


import { Component } from '@angular/core';
import { PopoverController, Item, GESTURE_ITEM_SWIPE } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ChatPage } from '../martha/chat'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,  } from 'angularfire2/firestore';


import { RecipesProvider } from '../../providers/recipes/recipes';
import { Observable } from  'rxjs/Observable';
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
  nombre_receta: string;
  favoritasTitulo: receta_titulo[];




  constructor(public popoverCtrl: PopoverController,public modalCtrl: ModalController,private fireStore: AngularFirestore,private rp: RecipesProvider ) { 

    

    }
  
  ionViewDidEnter(){
  this.personaCollection = this.fireStore.collection('usuarios');
  this.person = this.personaCollection.valueChanges();

  


  
this.favoritasCollection = this.fireStore.collection('/usuarios/Asbw31JLyrKU954DMh3L/recetas_favoritas',ref => ref.orderBy('priority'));
this.favoritasCollection.snapshotChanges().subscribe( recetaList => {
  this.favoritas= recetaList.map (item =>{

    //((nombre_x) =>{this.rp.summarizeRecipe(item.payload.doc.data().id)
      //.then((nombre_x) => {
        
        ///  this.data = nombre_x;
         // this.titulo= this.data.title;
        //console.log(nombre_x);
          //this.funcion_llamada(this.data)
    
          //return this.data.title;
          ///  })});
          
        //  this.loadRecipes(item.payload.doc.data().id);

return {

  id :item.payload.doc.data().id,
  priority:item.payload.doc.data().priority,
  id_2: item.payload.doc.id,
  



        }
  })
});



this.userDoc = this.fireStore.doc('/usuarios/MoVql64VQQ4P5OHrtY2l');
this.userDoc.snapshotChanges().subscribe(
  item =>{
         this.correo=item.payload.data().correo;
         this.usuario= item.payload.data().usuario;
         this.telefono=item.payload.data().telefono;
       
   // console.log( item.payload.data().correo);
   //this.user;
    } );

  
console.log(this.nombre_receta);
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




  presentMartha() {
    let profileModal = this.modalCtrl.create(ChatPage, { userId: 8675309 });
    profileModal.present();
  }

 // loadRecipes(id:number){


    

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
         }).then( ()=>{

         }
           
         )
         ;
  }





funcion_llamada(otro :string)
{
this.nombre_receta+=otro;
}

  metodo(id: number){
    this.loadRecipes(id);
  }

newItem()
{
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



}







interface receta
{
  id: number;
  priority: number;
    id_2: string;
    nombre?:string;
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
  


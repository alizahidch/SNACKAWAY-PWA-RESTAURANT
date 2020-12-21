import { Injectable ,NgZone} from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone) { }


    addCategory(category,id){
    return  this.afs.collection('categories').doc(id).set(category);

    }

    fetchCategories(rid){
      return this.afs.collection('categories', ref => ref.where('rid', '==', rid)).valueChanges();

    }


    deleteCategory(cid){
      return this.afs.collection('categories').doc(cid).delete();

    }

updateCategory(pdata){


return this.afs.collection("categories").doc(pdata.cid).update(pdata);
}


addFood(food,id){
  return  this.afs.collection('food').doc(id).set(food);

  }

  fetchFood(rid){
    return this.afs.collection('food', ref => ref.where('rid', '==', rid)).valueChanges();

  }

  deleteFood(fid){
    return this.afs.collection('food').doc(fid).delete();

  }

updateFood(pdata){


return this.afs.collection("food").doc(pdata.fid).update(pdata);
}


}

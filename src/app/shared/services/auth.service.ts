import { Injectable,NgZone } from '@angular/core';
import { User } from "../services/user";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userData: any; // Save logged in user data


  constructor(   public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone ) {

      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
     }


// Sign in with email/password
// SignIn(email, password) {
//   return this.afAuth.signInWithEmailAndPassword(email, password);
 
   
// }

SignIn(email, password) {
  return this.afAuth.signInWithEmailAndPassword(email, password);

}



// Sign up with email/password
SignUp(email, password) {
  return this.afAuth.createUserWithEmailAndPassword(email, password);
    
}

// Send email verfificaiton when new user sign up
  async SendVerificationMail() {
  return (await this.afAuth.currentUser).sendEmailVerification()
  .then(() => {
console.log("verification email sent")  })
}


SetUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const userData: User = {
    uid: user.uid,
    email: user.email,
    firstName:user.firstName,
    lastName:user.lastName,
    status:user.status,
    reviews:"0.0",
    role:user.role

  }
  return userRef.set(userData, {
    merge: true
  })
}


fetchUser(uid){
  return this.afs.collection("users").doc(uid).valueChanges();
}

// Sign out 
SignOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['entry']);
  })
}


async userUpdate(id,data){
 
return this.afs.collection("users").doc(id).update(data);
}

}

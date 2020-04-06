import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  constructor(private afAuth: AngularFireAuth) { }
// authentifie via un email et un password firbase
login(email: string, password: string){
    return new Promise((resolve, rejects)  => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => resolve(userData), (error) => rejects(error));
    });
  }
  // enregistrer un utilisateur
  registerUser(email: string, password: string){
    return new Promise((resolve, rejects)  => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userData) => resolve(userData), (error) => rejects(error));
    });
  }
// verifie l'authentification
getAuth(){
return this.afAuth.authState.pipe(map(auth => auth));
}
// login with google
loginWithGoogle(){
    return new Promise((resolve, rejects)  => {
      this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider)
      .then((userData) => resolve(userData), (error) => rejects(error));
    });
}
// deconnexion 
logAout(){
  this.afAuth.auth.signOut();
}
}

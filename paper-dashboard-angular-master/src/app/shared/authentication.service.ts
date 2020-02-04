import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from  '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
  this.router.navigateByUrl('/login');
    this.angularFireAuth
      .auth
      .signOut();
  }
}
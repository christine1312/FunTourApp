import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imgfile="assets/tourists.jpg";
  db = firebase.firestore();
  email = "hi@test.com";
  password = "secret";


  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {    
    var self = this;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found') {
        alert("User does not exist.");
      }
    }
    ).then(function(result){
      console.log(result)
      if(result != undefined)
        self.router.navigate(['/folder/MyPlan'])
      })
  }


  loginGoogle() {
    var self = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result){
      //This gives you a Google Access Token
      var token = result.credential.providerId;
      //The signed-in user info
      var user = result.user;
      console.log("google login succeeded")
      self.router.navigate(["/folder/MyPlan"]);
    });
  }

  loginFacebook() {
    var self = this;
    console.log("login facebook")
    console.log("Need to create Facebook app before this can work properly")
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.providerId;
      console.log(token)
      var user = result.user;
      console.log(user);
      self.router.navigate(['/folder/MyPlan']);
    })
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }

}

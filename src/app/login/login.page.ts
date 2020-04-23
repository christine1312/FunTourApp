import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imgfile="assets/tourists.jpg";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/folder/MyPlan'])
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

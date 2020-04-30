import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  imgfile="assets/tourists.jpg";
  db = firebase.firestore();


  constructor(
    private router: Router, 
    private tripsService: TripsService,
    public formBuilder: FormBuilder  
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(item) {    
    var self = this;
    var email=item.email;
    var password=item.password;
    const alert = document.createElement('ion-alert');

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      var errorCode = error.code;
      console.log(errorCode);

      if (errorCode === 'auth/wrong-password') {
        alert.header = 'Alert';
        alert.message = 'Wrong password';
        alert.buttons = ['Okay'];
        document.body.appendChild(alert);
        return alert.present();
      } else if (errorCode === 'auth/user-not-found') {
        alert.header = 'Alert';
        alert.message = 'No account associated with this email';
        alert.buttons = ['Okay'];
        document.body.appendChild(alert);
        return alert.present();
      }
    }
    ).then(function(result){
      console.log(result)
      if(result != undefined) {
        self.tripsService.setTrips();
        self.router.navigate(['/my-trips']);
      }
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
      console.log("google login succeeded");
      self.tripsService.setTrips();
      self.router.navigate(["/my-trips"]);
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
      self.router.navigate(['/my-trips']);
    })
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }

}

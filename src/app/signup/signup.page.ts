import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {
		email: "",
		password: ""
	};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup () {
    console.log(this.user.email+"  "+this.user.password)
  	var email = this.user.email;
  	var password = this.user.password;
    var self = this;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  		function(error) {
			console.log(error);
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			if(errorCode.length > 0){
				console.log('Signup failed');
			}
			else{
				console.log('Signup successful')
			}
		}).then(function(result){
			var user = firebase.auth().currentUser;
			var db = firebase.firestore();
			db.collection('users').add({
				'uid':user.uid,
				'email': user.email
			})
			.then(function(docRef) {
				console.log('usertype written with id: ', docRef.id);
			})
      console.log('Account successfully created');
      self.router.navigate(['login']);
	});
  }

}

import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.page.html',
  styleUrls: ['./attractions.page.scss'],
})
export class AttractionsPage implements OnInit {

  // NEXT: Show list of attractions

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addAttraction() {
    this.router.navigate(['/add-attraction']);
  }


  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    console.log("log out")
    this.router.navigate(['/login']);
  }

}

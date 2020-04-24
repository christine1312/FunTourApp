import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { Router } from '@angular/router';
import { AttractionService } from '../attraction.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.page.html',
  styleUrls: ['./attractions.page.scss'],
})
export class AttractionsPage implements OnInit {

  // NEXT: Show list of attractions
  /*attractions = [
    {"name":"Eiffel Tower", 
    "city":"Paris", 
    "stateorprovince":"Seine", 
    "country":"France",
    "type":"Tower",
    "img":"assets/eiffel.jpg",
    "description":"Such a beautiful tower!"},
    {"name":"Big Ben", 
    "city":"London",
    "stateorprovince":"Central", 
    "country":"England",
    "type":"Clock",
    "img":"assets/bigben.jpg",
    "description":"Ding dong"},
    {"name":"Swedish castle", 
    "city":"Stockholm",
    "stateorprovince":"Uppland", 
    "country":"Sweden",
    "type":"Castle",
    "img":"assets/castle.jpg",
    "description":"Royalties"},
      ];*/

      attractions = [];

  constructor(private router: Router,
    public attractionService:AttractionService) { 
     this.attractions = attractionService.getAttractions();

    console.log("HERE")
    console.log(this.attractions)
  }

  ngOnInit() {
  }

  addAttraction() {
    this.router.navigate(['/add-attraction']);
  }

  goToAttraction(attraction) {
    console.log("Go to: " + attraction.name);
    this.router.navigate(['/attraction-details', attraction])
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

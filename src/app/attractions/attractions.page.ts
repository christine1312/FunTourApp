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

      attractions = [];

  constructor(private router: Router,
    public attractionService:AttractionService) { 

      this.attractionService.getObservable().subscribe((data) => {
        this.attractions = this.attractionService.attractions;
      });
     console.log(this.attractions)
  }

  ngOnInit() {
    this.attractions = this.attractionService.getAttractions();
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

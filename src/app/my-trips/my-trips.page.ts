import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService } from '../trips.service';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
})
export class MyTripsPage implements OnInit {

  /* a collection of trips made by the user */
  trips = [];
  
  /* fake collection for testing */
  /*trips = [
    {"name":"Vacation to Sweden", "budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"},
    {"name":"Vacation to Berlin", "budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"},
    {"name":"Vacation to Paradise Falls","budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"}
  ];*/

  constructor(
    private Router: Router,
    private tripsService: TripsService,
  ) {
      this.tripsService.getObservable().subscribe((data) => {
        this.trips = this.tripsService.trips;
      });
  }

  ngOnInit() {
    this.tripsService.setTrips();
  }

  /* takes user to previous page */
  goBack() {
    this.Router.navigate(['folder/Inbox']);
  }

  /* takes the user to the create trip page */
  startNewTrip() {
    this.Router.navigate(['create-trip']);
  }

  /* takes the user to the details page for their selected trip */
  goToTrip(trip) {
    console.log(trip);
    this.Router.navigate(['trip-details', trip]);
  }

  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    console.log("log out")
    this.Router.navigate(['/login']);
  }
}

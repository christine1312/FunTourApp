import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.page.html',
  styleUrls: ['./my-trips.page.scss'],
})
export class MyTripsPage implements OnInit {

  /* a collection of trips made by the user */
  /* fake collection for testing */
  trips = [
    {"name":"Vacation to Sweden", "budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"},
    {"name":"Vacation to Berlin", "budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"},
    {"name":"Vacation to Paradise Falls","budget":"200", "category":"vacation", "start":"xx/xx/xx", "end":"xx/xx/xx"}
  ];

  constructor(
    private Router: Router
  ) { }

  ngOnInit() {
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
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage implements OnInit {
  /* stores the trip information from the trip details page */
  current_trip:any;
  constructor(
    private Router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* getting the trip selected by the user */
    this.route.params.subscribe(
      param => {
        this.current_trip = param;
        console.log(this.current_trip);
      }
    )
  }

  /* sends user back to previous trip details page */
  goBack() {
    this.Router.navigate(['trip-details', this.current_trip]);
  }

  /* sends user to add item page */
  addItem() {
    this.Router.navigate(['add-packing-item']);
  }

  /* sends user to add traveler page */
  addTraveler() {
    this.Router.navigate(['add-traveler']);
  }
}

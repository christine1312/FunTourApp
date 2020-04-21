import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {

  /* new form group for getting input from the user */
  new_trip_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public tripsService: TripsService,
    private Router: Router
  ) { }

  ngOnInit() {
    /* defining the input parameters for a new trip */
    this.new_trip_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.Router.navigate(['my-trips']);
  }

  /* calls addTrip function from trip service to add a new trip to the database */
  addTrip(trip) {
    /* logging input parameters for new trip for future reference */
    console.log(trip.name);
    console.log(trip.budget);
    console.log(trip.category);
    console.log(trip.start);
    console.log(trip.end);
    /* send new trip to addTrip() in trips service */
    this.tripsService.addTrip(trip.name, trip.budget, trip.category, trip.start, trip.end);
    /* send user back to previous page */
    this.goBack();
  }

}

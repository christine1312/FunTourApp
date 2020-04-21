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

  addTrip() {
    this.goBack();
  }

}

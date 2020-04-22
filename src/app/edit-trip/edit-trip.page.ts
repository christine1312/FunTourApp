import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage implements OnInit {
  /* stores the trip information from the trip details page */
  current_trip:any;
  /* new form for editing a trip */
  edit_trip_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public tripsService: TripsService,
    private Router: Router,
    private route: ActivatedRoute
  ) {
    /* defining the input parameters to edit trip */
    this.edit_trip_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    /* getting the trip selected by the user */
    this.route.params.subscribe(
      param => {
        this.current_trip = param;
        console.log(this.current_trip);

        /* Loading current values for trip */
        this.edit_trip_form.patchValue({name:this.current_trip.name});
        this.edit_trip_form.patchValue({budget:this.current_trip.budget});
        this.edit_trip_form.patchValue({category:this.current_trip.category});
        this.edit_trip_form.patchValue({start:this.current_trip.start});
        this.edit_trip_form.patchValue({end:this.current_trip.end});
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

   /* calls updateTrip function from trips service to push updated values to the database */
   updateTrip(new_trip) {
    /* logging input parameters for a new trip for future reference */
    console.log(new_trip.name);
    console.log(new_trip.budget);
    console.log(new_trip.category);
    console.log(new_trip.start);
    console.log(new_trip.end);
    /* send edited trip to updateTrip in trips service */
    this.tripsService.updateTrip(new_trip.name, new_trip.budget, new_trip.category, new_trip.start, new_trip.end);
   }
}

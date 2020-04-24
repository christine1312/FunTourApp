import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelersService } from '../travelers.service';

@Component({
  selector: 'app-add-traveler',
  templateUrl: './add-traveler.page.html',
  styleUrls: ['./add-traveler.page.scss'],
})
export class AddTravelerPage implements OnInit {

  /* the trip the user wants to edit */
  current_trip:any;

  /* new form group for getting input from the user */
  new_traveler_form: FormGroup;

  /* src for traveler image above the form */
  traveler_image = "assets/roadtrip_one.png";

  constructor(
    public formBuilder: FormBuilder,
    public travelersService: TravelersService,
    private Router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* defining the input parameters for a new traveler */
    this.new_traveler_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      items: new FormControl('', Validators.required),
      needs: new FormControl('', Validators.required)
    });
    /* get the current trip from edit trip page  */
    this.route.params.subscribe(
      param => {
        this.current_trip = param;
        console.log(this.current_trip);
      }
    )
  }

  goBack() {
    this.Router.navigate(['my-trips']);
  }

  /* calls addTraveler function from traveler service to add a new traveler to the database */
  addTraveler(traveler) {
    /* logging input parameters for new traveler for future reference */
    console.log(traveler.name);
    console.log(traveler.phone);
    console.log(traveler.items);
    console.log(traveler.needs);
    console.log("trip id: " + this.current_trip.id);
    /* send new traveler to addTraveler() in travelers service */
    this.travelersService
      .addTraveler(this.current_trip.id, traveler.name, traveler.phone, traveler.items, traveler.needs);
    /* send user back to previous page */
    this.goBack();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  /* stores the trip information selected by the user */
  current_trip:any;

  /* packing list for a given trip */
  /* fake collection for testing */
  packing_list = [
    {"name":"bags of chips", "category":"food", "quantity":"3", "who":"Jeff"},
    {"name":"bottles of water", "category":"drink", "quantity":"10", "who":"Karen"},
    {"name":"first aid kit", "category":"first-aid", "quantity":"1", "who":"Kevin"}
  ];

  /* list of travelers for a trip */
  /* fake collection for testing */
  travelers = [
    {"name":"Jeff", "phone":"xxx-xxx-xxx", "items":"bags of chips", "needs":"contacts"},
    {"name":"Karen", "phone":"xxx-xxx-xxx", "items":"bottles of water", "needs":"allergy medicine"},
    {"name":"Kevin", "phone":"xxx-xxx-xxx", "items":"first-aid kit", "needs":"glasses"}
  ];
  
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

  goBack() {
    this.Router.navigate(['my-trips']);
  }

  /* sends user to the edit trip page */
  editTrip() {
    this.Router.navigate(['edit-trip']);
  }



}

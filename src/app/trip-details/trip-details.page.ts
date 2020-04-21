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

}

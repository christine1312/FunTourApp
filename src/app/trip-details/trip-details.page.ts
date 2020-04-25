import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../items.service';
import { TravelersService } from '../travelers.service';
import { TripsService } from '../trips.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  /* stores the trip information selected by the user */
  current_trip:any;

  /* packing list for a given trip */
  packing_list = [];
  /* fake collection for testing
  packing_list = [
    {"name":"bags of chips", "category":"food", "quantity":"3", "who":"Jeff"},
    {"name":"bottles of water", "category":"drink", "quantity":"10", "who":"Karen"},
    {"name":"first aid kit", "category":"first-aid", "quantity":"1", "who":"Kevin"}
  ];*/

  /* list of travelers for a trip */
  travelers = [];
  /* fake collection for testing
  travelers = [
    {"name":"Jeff", "phone":"xxx-xxx-xxx", "items":"bags of chips", "needs":"contacts"},
    {"name":"Karen", "phone":"xxx-xxx-xxx", "items":"bottles of water", "needs":"allergy medicine"},
    {"name":"Kevin", "phone":"xxx-xxx-xxx", "items":"first-aid kit", "needs":"glasses"}
  ];*/
  
  constructor(
    private Router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private travelerService: TravelersService,
    private tripsService: TripsService,
    public alertController: AlertController
  ) {
    this.itemService.getObservable().subscribe((data) => {
      this.packing_list = this.itemService.packing_list;
    });
    this.travelerService.getObservable().subscribe((data) => {
      this.travelers = this.travelerService.travelers;
    });
  }

  ngOnInit() {
    /* getting the trip selected by the user */
    this.route.params.subscribe(
      param => {
        this.current_trip = param;
        console.log(this.current_trip);
      }
    )
    /* set packing list */
    console.log("Getting packing list for trip with id " + this.current_trip.id);
    this.itemService.setPackingList(this.current_trip.id);
    /* set travelers list */
    console.log("getting travelers list for trip with id " + this.current_trip.id);
    this.travelerService.setTravelersList(this.current_trip.id);
  }

  goBack() {
    this.Router.navigate(['my-trips']);
  }

  /* sends user to the edit trip page */
  editTrip() {
    this.Router.navigate(['edit-trip', this.current_trip]);
  }

  /* presents alert before deleting trip */
  /* if users clicks yes, trip is deleted */
  async deleteTrip() {
    var self = this;
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Deleting your trip will delete its packing list and travelers list too. Are you sure you want to delete your trip?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log("User canceled delete. Nothing deleted.");
          }
        },
        {
          text: 'Yes',
          handler: () => {
            self.tripsService.deleteTrip(this.current_trip.id);
            self.Router.navigate(['my-trips']);
          }
        }
      ]
    });

    await alert.present();
  }
}

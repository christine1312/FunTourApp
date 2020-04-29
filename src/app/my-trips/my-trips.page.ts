import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService } from '../trips.service';
import * as firebase from 'Firebase';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController
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
    if(firebase.auth().currentUser != null) {
      this.Router.navigate(['create-trip']);
    } else {
      this.presentSignInAlert("You need to sign in before you can start a new trip.");
    }
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
    this.tripsService.resetTrips();
    this.Router.navigate(['/login']);
  }

  /* presents an alert with message m */
  async presentSignInAlert(m:string) {
    var self = this;
    const alert = await this.alertController.create({
      message: m,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            self.Router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }
}

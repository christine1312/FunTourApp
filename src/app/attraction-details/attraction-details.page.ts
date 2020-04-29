import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';
import { Router,ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { AlertController } from '@ionic/angular';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-attraction-details',
  templateUrl: './attraction-details.page.html',
  styleUrls: ['./attraction-details.page.scss'],
})
export class AttractionDetailsPage implements OnInit {

  attraction: any;
  attractions: any;

  constructor(private attractionService:AttractionService,
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private tripsService: TripsService
    ) { 
      this.attractionService.getObservable().subscribe((data) => {
        this.attractions = this.attractionService.attractions;
      });
    }

  ngOnInit() {
    this.attractions = this.attractionService.getAttractions();
    this.route.params.subscribe(
      param =>{
        this.attraction = param;
      }
    )
  }


  editAttraction(attraction) {
    if(attraction.uid !== firebase.auth().currentUser.uid) {
      this.presentAlert()
    } else {
      this.router.navigate(['/edit-attraction', attraction])
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Not allowed',
      message: 'The attraction can only be edited by the user who created it.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, 
      ]
    });
  
    await alert.present();
  }

  logout() {
    this.tripsService.resetTrips();
    this.attractionService.logout();
  }

}

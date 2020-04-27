import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import {Subject} from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TravelersService {

  /* list of travelers for a given trip */
  travelers = [];

  /* for passing information back to my-trips page */
  private eventSubject = new Subject<any>();
  
  constructor(
    public alertController: AlertController
  ) { }

  /*************************************************************************
   * addTraveler() adds a new traveler to a given trip
   * name - name of the traveler - e.g. John Doe
   * phone - phone number of the traveler - e.g. xxx-xxx-xxx
   * items - all of the items the traveler will bring - e.g. chips
   * needs - any necessary items the traveler needs - e.g. contacts
   *************************************************************************/
  addTraveler(trip_id, name, phone, items, needs) {
    console.log("addTraveler()");
    var self = this;
    /* getting the uid of the account that created the new traveler */
    var uid = null;
    if (firebase.auth().currentUser != null) {
      uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
    }
    else {
      /* no one logged in */
      console.log("no user logged in, no traveler created");
      return;
    }

    /* add the new traveler to the database */
    var db = firebase.firestore();
    db.collection("travelers").add({
      'uid':uid,
      'name':name,
      'phone':phone,
      'items':items,
      'needs':needs,
      'trip id':trip_id
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      self.presentAlert(name + " has been added to your trip!");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      self.presentAlert("Oops! Something went wrong!");
    });
  }

  setTravelersList(trip_id) {
    /* check to see if anyone is signed in */
    var self = this;
    if (firebase.auth().currentUser != null) {
      /* query database for travelers matching current trip's uid */
      console.log("Finding travelers with trip id " + trip_id);
      firebase.firestore().collection("travelers").where("trip id", "==", trip_id)
      .onSnapshot(function(querySnapshot) {
        console.log("packing list changed");
        self.travelers = [];
        querySnapshot.forEach(function(doc) {
          /* add each item with matching trip id to packing list */
          var traveler = doc.data();
          var id = doc.id;
          self.travelers.push({id:id, name:traveler.name, phone:traveler.phone, needs:traveler.needs});
        });
        self.publishEvent({
          foo: 'bar'
        });
      });
    } else {
      /* no one signed in */
      console.log("No one signed in");
      return;
    }
  }

  deleteTraveler(traveler_id) {
    console.log("Deleting traveler with id " + traveler_id);
    var self = this;
    var db = firebase.firestore();

    /* delete the traveler from the database */
    db.collection("travelers").doc(traveler_id).delete().then(function() {
      console.log("Successfully deleted traveler with id " + traveler_id);
    }).catch(function(error) {
      console.error("Error removing document: " + error);
    });
  }

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }

  /* presents an alert with message m */
  async presentAlert(m:string) {
    const alert = await this.alertController.create({
      message: m,
      buttons: ['OK']
    });

    await alert.present();
  }

}

import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor() { }

  /*************************************************************************
   * addTrip() adds a new trip to the database
   * name - name of the trip - e.g. Vacation to Sweden
   * budget - money set aside to use for the trip - e.g. 500
   * category - type of trip - e.g. work, vacation, etc.
   * start - day that the trip starts - e.g. xx/xx/xx
   * end - day that the trip ends - e.g. xx/xx/xx
   *************************************************************************/
  addTrip(name, budget, category, start, end) {
    console.log("addTrip()");
    /* getting the uid of the account that created the new traveler */
    var uid = null;
    if (firebase.auth().currentUser != null) {
      uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
    }
    else {
      /* no one logged in */
      console.log("no user logged in, no traveler created");
      alert("You need to log in before you can add a new traveler to your trip!");
      return;
    }

    /* add the new trip to the database */
    var db = firebase.firestore();
    db.collection("trips").add({
      'uid':uid,
      'name':name,
      'budget':budget,
      'category':category,
      'start':start,
      'end':end
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      alert("Your new trip has been saved!");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      alert("Oops! Something went wrong!");
    });
  }

  /* updates an existing trip in the database */
  updateTrip(name, budget, category, start, end) {
    console.log("updateTrip()");
  }
}

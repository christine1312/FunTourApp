import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelersService {

  /* list of travelers for a given trip */
  travelers = [];

  /* for passing information back to my-trips page */
  private eventSubject = new Subject<any>();
  
  constructor() { }

  /*************************************************************************
   * addTraveler() adds a new traveler to a given trip
   * name - name of the traveler - e.g. John Doe
   * phone - phone number of the traveler - e.g. xxx-xxx-xxx
   * items - all of the items the traveler will bring - e.g. chips
   * needs - any necessary items the traveler needs - e.g. contacts
   *************************************************************************/
  addTraveler(trip_id, name, phone, items, needs) {
    console.log("addTraveler()");
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
      alert(name + " has been added to your trip!");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      alert("Oops! Something went wrong!");
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
          self.travelers.push({name:traveler.name, phone:traveler.phone, needs:traveler.needs});
        });
        self.publishEvent({
          foo: 'bar'
        });
      });
    } else {
      /* no one signed in */
      console.log("No one signed in");
      alert("Oops! You're not signed in! If you want to see your trips, you need to sign in first.");
      return;
    }
  }

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }

}

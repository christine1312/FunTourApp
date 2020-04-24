import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  
  /* collection of trips for a specific user */
  trips = [];

  /* for passing information back to my-trips page */
  private eventSubject = new Subject<any>();

  constructor() {
    /* check to see if anyone is signed in */
    var self = this;
    if (firebase.auth().currentUser != null) {
      /* query database for trips matching current user's uid */
      firebase.firestore().collection("trips").where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
        console.log("trips list changed");
        self.trips = [];
        querySnapshot.forEach(function(doc) {
          /* add each trip with matching uid to trips collection */
          var trip = doc.data();
          var id = doc.id;
          self.trips.push({id:id, uid:trip.uid, name:trip.name, budget:trip.budget, category:trip.category, start:trip.start, end:trip.end});
        });
        self.publishEvent({
          foo: 'bar'
        });
      });
    } else {
      /* no one signed in */
      console.log("No one signed in");
      alert("Oops! You're not signed in! If you want to see your trips, you need to sign in first.");
    }
  }

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
  updateTrip(new_trip, trip_id) {
    console.log("updateTrip()");
    /* new information to update a trip in the database with corresponding id */
    console.log(new_trip);
    console.log(trip_id);
    /* update trip */
    firebase.firestore().collection('trips').doc(trip_id).update({
      name: new_trip.name,
      budget: new_trip.budget,
      category: new_trip.category,
      start: new_trip.start,
      end: new_trip.end
    });
    console.log("update complete");
    alert("Your changes have been saved!");
  }

  /* sets trip list to a collection of trips with uid equal to current user's uid */
  setTrips() {
    /* check to see if anyone is signed in */
    var self = this;
    if (firebase.auth().currentUser != null) {
      /* query database for trips matching current user's uid */
      firebase.firestore().collection("trips").where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
        console.log("trips list changed");
        self.trips = [];
        querySnapshot.forEach(function(doc) {
          /* add each trip with matching uid to trips collection */
          var trip = doc.data();
          var id = doc.id;
          self.trips.push({id:id, uid:trip.uid, name:trip.name, budget:trip.budget, category:trip.category, start:trip.start, end:trip.end});
        });
        self.publishEvent({
          foo: 'bar'
        });
      });
    } else {
      /* no one signed in */
      console.log("No one signed in");
      alert("Oops! You're not signed in! If you want to see your trips, you need to sign in first.");
    }
  }

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }
}

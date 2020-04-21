import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class TravelersService {
  
  constructor() { }

  /*************************************************************************
   * addTraveler() adds a new traveler to a given trip
   * name - name of the traveler - e.g. John Doe
   * phone - phone number of the traveler - e.g. xxx-xxx-xxx
   * items - all of the items the traveler will bring - e.g. chips
   * needs - any necessary items the traveler needs - e.g. contacts
   *************************************************************************/
  addTraveler(name, phone, items, needs) {
    console.log("addTraveler()");
    /* getting the uid of the account that created the new traveler */
    /*
    var uid = null;
    if (firebase.auth().currentUser != null) {
      uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
    }
    else {*/
      /* no one logged in */
      /*console.log("no user logged in, no traveler created");
      alert("You need to log in before you can add a new traveler to your trip!");
      return;
    }*/

    /* add the new traveler to the database */
    var db = firebase.firestore();
    db.collection("travelers").add({
      //'uid':uid,
      'name':name,
      'phone':phone,
      'items':items,
      'needs':needs
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



}

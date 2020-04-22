import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  /*************************************************************************
   * addItem() adds a new item to the packing list for a given trip
   * name - name of the item - e.g. chips
   * category - the type of item - e.g. food, first-aid, etc.
   * quantity - how many - e.g. 2
   * who - name of the traveler who will bring it - e.g. John Doe
   *************************************************************************/
  addItem(name, category, quantity, who) {
    console.log("addItem()");
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

    /* add the new item to the packing list */
    var db = firebase.firestore();
    db.collection("items").add({
      //'uid':uid,
      'name':name,
      'category':category,
      'quantity':quantity,
      'who':who,
      'trip id':"dummy"
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      alert(name + " has been added to your trip's packing list!");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      alert("Oops! Something went wrong!");
    });
  }
}

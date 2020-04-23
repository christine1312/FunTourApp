import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  constructor() { }

  addAttraction(name, img, type, description, city, stateprov, country) {
    console.log("addAttraction()");
    /* getting the uid of the account that created the new attraction */
    var uid = null;
    if (firebase.auth().currentUser != null) {
      uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
    }
    else {
      /* no one logged in */
      console.log("no user logged in, no attraction created");
      alert("You need to log in before you can add a new attraction to your trip!");
      return;
    }

    /* add the new attraction to the database */
    var db = firebase.firestore();
    db.collection("attractions").add({
      'uid':uid,
      'name':name,
      'img':img,
      'type':type,
      'description':description,
      'city':city,
      'stateprov':stateprov,
      'country':country,
      'attraction id':"dummy"
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      alert(name + " has been added as an attraction");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      alert("Oops! Something went wrong!");
    });
  }


}

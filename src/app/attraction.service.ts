import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  db = firebase.firestore();
  attractions = [];

  constructor() {
    var self = this;

        this.db.collection("attractions")
        .onSnapshot(function(querySnapshot) {
          self.attractions = [];
          querySnapshot.forEach(function(doc) {
            var attraction = doc.data();
            self.attractions.push({
              uid: attraction.uid,
              name: attraction.name,
              img: attraction.img,
              type: attraction.type,
              description: attraction.description,
              city: attraction.city,
              stateorprovince: attraction.stateorprovince,
              country: attraction.country,
              id: doc.id})
          });
          // self.events.publish('itemloaded',Date.now())

        });

   }

  addAttraction(name, img, type, description, city, stateorprovince, country) {
    console.log(name + " " + img + " " + type + " " + description + " " + city + " " + stateorprovince + " " + country)
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
      'stateorprovince':stateorprovince,
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

  public getAttractions() {
    return this.attractions;
  }


}

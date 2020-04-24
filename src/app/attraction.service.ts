import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  db = firebase.firestore();
  attractions = [];

  constructor(private router: Router,) {
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
    var self = this;
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
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      alert(name + " has been added as an attraction");
      self.addAttractionToLocalList();
     })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      alert("Oops! Something went wrong!");
    });    
  }

  addAttractionToLocalList() {
    var self =this;
    this.db.collection("attractions").where("uid", "==", firebase.auth().currentUser.uid)
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
        })
        console.log(self.attractions)
  }

  editAttraction(name, img, type, description, city, stateorprovince, country) {
    console.log("EDIT")
    console.log(name, img, type, description, city, stateorprovince, country)
  }

  deleteAttraction(id) {  
    var self = this;
    var db = firebase.firestore()
    console.log(self.attractions)
    self.deleteAttractionLocally(id);
    console.log(self.attractions)
      db.collection("attractions").doc(id).delete().then(function() {
        self.router.navigate(["/attractions"]);
      }).catch(function(error) {
        console.log("Error removing document " + error);
      });
      //self.events.publish('orderloaded',Date.now())
  }

  deleteAttractionLocally(id) {
    for(var i = 0; i < this.attractions.length; i++){
      if(this.attractions[i].id === id) {
        this.attractions.splice(i,i);
      }
    }
  }


  public getAttractions() {
    return this.attractions;
  }


}

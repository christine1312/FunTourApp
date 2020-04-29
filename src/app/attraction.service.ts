import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs';
import * as firebase from 'Firebase';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  private eventSubject = new Subject<any>();
  db = firebase.firestore();
  attractions = [];

  constructor(private router: Router,) {
    var self = this;

        this.db.collection("attractions") //self?
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
          self.publishEvent({
            foo: 'bar'
          });

        });
   }

  addAttraction(name, img, type, description, city, stateorprovince, country) {
    var self = this;
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
      // alert(name + " has been added as an attraction");
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
  }

  editAttraction(name, img, type, description, city, stateorprovince, country, id) {
    firebase.firestore().collection('attractions').doc(id).update({
      name: name,
      img: img,
      type: type,
      description: description,
      city: city,
      stateorprovince: stateorprovince,
      country: country,
    });

  }

  
  deleteAttraction(id) {  
    var self = this;
    var db = firebase.firestore()
    self.deleteAttractionLocally(id);
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

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }

  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    this.router.navigate(['/login']);
  }

}

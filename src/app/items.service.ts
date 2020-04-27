import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import {Subject} from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  /* a packing list for a given trip */
  packing_list = [];

  /* for passing information back to my-trips page */
  private eventSubject = new Subject<any>();

  constructor(
    public alertController: AlertController
  ) { }

  /*************************************************************************
   * addItem() adds a new item to the packing list for a given trip
   * name - name of the item - e.g. chips
   * category - the type of item - e.g. food, first-aid, etc.
   * quantity - how many - e.g. 2
   * who - name of the traveler who will bring it - e.g. John Doe
   *************************************************************************/
  addItem(trip_id, name, category, quantity, who) {
    console.log("addItem()");
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

    /* add the new item to the packing list */
    var db = firebase.firestore();
    db.collection("items").add({
      //'uid':uid,
      'name':name,
      'category':category,
      'quantity':quantity,
      'who':who,
      'trip id':trip_id
    })
    .then(function(docRef) {
      /* successfully added to firebase */
      console.log("Document Written with ID: " + docRef.id);
      self.presentAlert(name + " has been added to your trip's packing list!");
    })
    .catch(function(error) {
      /* an error occurred */
      console.error("Error adding document: " + error);
      self.presentAlert("Oops! Something went wrong!");
    });
  }

  /* sets the packing list for a given trip in trip-details page */
  setPackingList(trip_id) {
    /* check to see if anyone is signed in */
    var self = this;
    if (firebase.auth().currentUser != null) {
      /* query database for items matching current trip's id */
      console.log("Finding items with trip id " + trip_id);
      firebase.firestore().collection("items").where("trip id", "==", trip_id)
      .onSnapshot(function(querySnapshot) {
        console.log("packing list changed");
        self.packing_list = [];
        querySnapshot.forEach(function(doc) {
          /* add each item with matching trip id to packing list */
          var item = doc.data();
          var id = doc.id;
          self.packing_list.push({id:id, name:item.name, category:item.category, quantity:item.quantity, who:item.who});
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

  /* deletes an item with a given id */
  deleteItem(item_id) {
    console.log("Deleting item with id " + item_id);
    var self = this;
    var db = firebase.firestore();

    /* delete the item from the database */
    db.collection("items").doc(item_id).delete().then(function() {
      console.log("Successfully deleted item with id " + item_id);
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

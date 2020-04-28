import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';

declare var google;

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement', {static:true}) mapElement;
  constructor(private router:Router) { }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map (
      this.mapElement.nativeElement,
      {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      }
    )
  }

  ngOnInit() {
  }

  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    console.log("log out")
    this.router.navigate(['/login']);
  }

}

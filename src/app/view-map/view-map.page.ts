import { Component, NgZone, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AttractionService } from '../attraction.service';
import * as firebase from 'Firebase';
import { TripsService } from '../trips.service';

declare var google;

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit, AfterContentInit {
  currentLat: any;
  currentLng: any;

  options: GeolocationOptions;
  currentPos: Geoposition;
  places: Array<any>;

  @ViewChild('mapElement', {static:true}) mapElement;
  map: any;

  constructor(
    public zone: NgZone,
    private router:Router,
    private geolocation: Geolocation,
    public attractionService: AttractionService,
    public tripsService: TripsService
  ) { }

  ngAfterContentInit(): void {}

  ngOnInit() { 
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 38, lng: -99},
        zoom: 3
      });

      let location = new google.maps.LatLng(this.currentLat, this.currentLng);

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'You are here'
      });
      marker.setPosition(location);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    console.log("log out");
    this.tripsService.resetTrips();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement', {static:true}) mapElement;
  constructor() { }

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

}

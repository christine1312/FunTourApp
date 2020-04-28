import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'Firebase';

/* firebase config settings */
var firebaseConfig = {
  apiKey: "AIzaSyABRQvxgM5ukRQSiGynIUcDrTQUwKydOSI",
  authDomain: "fun-tourist-app.firebaseapp.com",
  databaseURL: "https://fun-tourist-app.firebaseio.com",
  projectId: "fun-tourist-app",
  storageBucket: "fun-tourist-app.appspot.com",
  messagingSenderId: "913083674329",
  appId: "1:913083674329:web:1360cc7492950b2ef0d8c8",
  measurementId: "G-MMGJ1BJGQZ"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'My Trips',
      url: 'my-trips',
      icon: 'briefcase'
    },
    {
      title: 'Attractions',
      url: '/attractions',
      icon: 'golf'
    },
    {
      title: 'Map',
      url: '/view-map',
      icon: 'map'
    },    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}

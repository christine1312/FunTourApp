import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'My plan',
      url: '/folder/MyPlan',
      icon: 'earth'
      //icon: 'reader' // another icon option
    },
    {
      title: 'Map',
      url: '/folder/Map',
      icon: 'map'
    },
    {
      title: 'Search by city',
      url: '/search-by-city',
      icon: 'search'
    },
    {
      title: 'Search with Google',
      url: '/folder/SearchWithGoogle',
      icon: 'search-circle'
    },
    {
      title: 'Add attraction',
      url: '/folder/AddAttraction',
      icon: 'add'
    },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}

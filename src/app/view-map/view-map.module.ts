import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule } from '@ionic/angular';

import { ViewMapPageRoutingModule } from './view-map-routing.module';
import { ViewMapPage } from './view-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMapPageRoutingModule
  ],
  declarations: [ViewMapPage],
  providers: [
    Geolocation
  ]
})
export class ViewMapPageModule {}

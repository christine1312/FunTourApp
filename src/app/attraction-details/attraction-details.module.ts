import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttractionDetailsPageRoutingModule } from './attraction-details-routing.module';

import { AttractionDetailsPage } from './attraction-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttractionDetailsPageRoutingModule
  ],
  declarations: [AttractionDetailsPage]
})
export class AttractionDetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAttractionPageRoutingModule } from './add-attraction-routing.module';

import { AddAttractionPage } from './add-attraction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAttractionPageRoutingModule
  ],
  declarations: [AddAttractionPage]
})
export class AddAttractionPageModule {}

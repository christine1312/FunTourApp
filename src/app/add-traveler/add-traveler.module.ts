import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTravelerPageRoutingModule } from './add-traveler-routing.module';

import { AddTravelerPage } from './add-traveler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTravelerPageRoutingModule,
  ],
  declarations: [AddTravelerPage]
})
export class AddTravelerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAttractionPageRoutingModule } from './edit-attraction-routing.module';

import { EditAttractionPage } from './edit-attraction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditAttractionPageRoutingModule
  ],
  declarations: [EditAttractionPage]
})
export class EditAttractionPageModule {}

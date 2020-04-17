import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPackingItemPageRoutingModule } from './add-packing-item-routing.module';

import { AddPackingItemPage } from './add-packing-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddPackingItemPageRoutingModule
  ],
  declarations: [AddPackingItemPage]
})
export class AddPackingItemPageModule {}

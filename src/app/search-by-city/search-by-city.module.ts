import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchByCityPageRoutingModule } from './search-by-city-routing.module';

import { SearchByCityPage } from './search-by-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchByCityPageRoutingModule
  ],
  declarations: [SearchByCityPage]
})
export class SearchByCityPageModule {}

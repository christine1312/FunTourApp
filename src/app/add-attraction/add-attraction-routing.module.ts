import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAttractionPage } from './add-attraction.page';

const routes: Routes = [
  {
    path: '',
    component: AddAttractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAttractionPageRoutingModule {}

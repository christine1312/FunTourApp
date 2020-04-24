import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAttractionPage } from './edit-attraction.page';

const routes: Routes = [
  {
    path: '',
    component: EditAttractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAttractionPageRoutingModule {}

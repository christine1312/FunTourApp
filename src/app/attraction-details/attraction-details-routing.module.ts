import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttractionDetailsPage } from './attraction-details.page';

const routes: Routes = [
  {
    path: '',
    component: AttractionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttractionDetailsPageRoutingModule {}

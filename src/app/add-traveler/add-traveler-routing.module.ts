import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTravelerPage } from './add-traveler.page';

const routes: Routes = [
  {
    path: '',
    component: AddTravelerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTravelerPageRoutingModule {}

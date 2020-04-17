import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPackingItemPage } from './add-packing-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddPackingItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPackingItemPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchByCityPage } from './search-by-city.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchByCityPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
   {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'search-by-city',
    loadChildren: () => import('./search-by-city/search-by-city.module').then( m => m.SearchByCityPageModule)
  },
  {
    path: 'add-traveler',
    loadChildren: () => import('./add-traveler/add-traveler.module').then( m => m.AddTravelerPageModule)
  },
  {
    path: 'add-packing-item',
    loadChildren: () => import('./add-packing-item/add-packing-item.module').then( m => m.AddPackingItemPageModule)
  },
  {
    path: 'add-attraction',
    loadChildren: () => import('./add-attraction/add-attraction.module').then( m => m.AddAttractionPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'my-trips',
    loadChildren: () => import('./my-trips/my-trips.module').then( m => m.MyTripsPageModule)
  },
  {
    path: 'create-trip',
    loadChildren: () => import('./create-trip/create-trip.module').then( m => m.CreateTripPageModule)
  },
  {
    path: 'trip-details',
    loadChildren: () => import('./trip-details/trip-details.module').then( m => m.TripDetailsPageModule)
  },
  {
    path: 'edit-trip',
    loadChildren: () => import('./edit-trip/edit-trip.module').then( m => m.EditTripPageModule)
  },
  {
    path: 'view-map',
    loadChildren: () => import('./view-map/view-map.module').then( m => m.ViewMapPageModule)
  },
  {
    path: 'attractions',
    loadChildren: () => import('./attractions/attractions.module').then( m => m.AttractionsPageModule)
  },
  {
    path: 'attraction-details',
    loadChildren: () => import('./attraction-details/attraction-details.module').then( m => m.AttractionDetailsPageModule)
  },
  {
    path: 'edit-attraction',
    loadChildren: () => import('./edit-attraction/edit-attraction.module').then( m => m.EditAttractionPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

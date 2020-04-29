import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttractionService } from '../attraction.service';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.page.html',
  styleUrls: ['./attractions.page.scss'],
})
export class AttractionsPage implements OnInit {

      allAttractions = [];
      currentAttractions = [];
      searchbar = "";
      listTitle = "All attractions";

  constructor(private router: Router,
    public attractionService:AttractionService, private tripsService: TripsService) { 

      this.attractionService.getObservable().subscribe((data) => {
        this.allAttractions = this.attractionService.attractions;
        this.currentAttractions = this.attractionService.attractions;
      });
  }

  ngOnInit() {
    this.allAttractions = this.attractionService.getAttractions();
    this.currentAttractions = this.attractionService.getAttractions();
  }


  addAttraction() {
    this.router.navigate(['/add-attraction']);
  }

  goToAttraction(attraction) {
    this.router.navigate(['/attraction-details', attraction])
  }

  search() {
    let attractionsByCity = this.filterByCity()
    this.currentAttractions = attractionsByCity;
    this.listTitle = "All attractions in " + this.searchbar.substring(0,1).toUpperCase() + this.searchbar.substring(1).toLowerCase();
    this.searchbar = "";
  }

  filterByCity() {
    let attractionsByCity = [];
    for(let attraction of this.allAttractions) {
      let searchedCity = this.searchbar.toLowerCase()
      let attractionCity = attraction.city.toLowerCase()
      if(searchedCity === attractionCity) {
        attractionsByCity.push(attraction)
      }
    }
    return attractionsByCity;
  }

  clear() {
    this.currentAttractions = this.attractionService.getAttractions();
    this.listTitle = "All attractions";
    this.searchbar = "";
  }

  logout() {
    this.tripsService.resetTrips();
    this.attractionService.logout();
  }

}

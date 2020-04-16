import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-city',
  templateUrl: './search-by-city.page.html',
  styleUrls: ['./search-by-city.page.scss'],
})
export class SearchByCityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    console.log("log out")
  }

}

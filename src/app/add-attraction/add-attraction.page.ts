import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.page.html',
  styleUrls: ['./add-attraction.page.scss'],
})
export class AddAttractionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    console.log("log out")
  }

  addAttraction() {
    console.log("Add attraction")
  }

}

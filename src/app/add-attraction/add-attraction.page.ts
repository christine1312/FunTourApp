import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AttractionService } from '../attraction.service';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.page.html',
  styleUrls: ['./add-attraction.page.scss'],
})
export class AddAttractionPage implements OnInit {

  formGroup : FormGroup;


  constructor(private router: Router,
    public formBuilder: FormBuilder,
    public attractionService:AttractionService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      stateprovince: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error){
      console.log("logout error: " + error)
    });
    console.log("log out")
    this.router.navigate(['/login']);
  }

  addAttraction(attraction) {
    console.log(attraction)
    this.attractionService.addAttraction(
      attraction.name, 
      attraction.img, 
      attraction.type,
      attraction.description,
      attraction.city,
      attraction.stateprovince,
      attraction.country)
      this.router.navigate(['/attractions'])
  }

}

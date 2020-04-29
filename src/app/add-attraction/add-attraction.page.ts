import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AttractionService } from '../attraction.service';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.page.html',
  styleUrls: ['./add-attraction.page.scss'],
})
export class AddAttractionPage implements OnInit {

  formGroup : FormGroup;


  constructor(private router: Router,
    public formBuilder: FormBuilder,
    public attractionService:AttractionService,
    private tripsService: TripsService) { }

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
    this.tripsService.resetTrips();
    this.attractionService.logout();
  }

  addAttraction(attraction) {
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

import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-attraction',
  templateUrl: './edit-attraction.page.html',
  styleUrls: ['./edit-attraction.page.scss'],
})
export class EditAttractionPage implements OnInit {

  formGroup : FormGroup;
  attraction : any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private attractionService:AttractionService,) { }

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

    this.route.params.subscribe(
      param =>{
        this.attraction = param;
        console.log(this.attraction)
      }
    )
  }

  editAttraction(attraction) {
    console.log("edit")
    console.log(attraction)
    console.log(this.attraction)

    let name = attraction.name;
    let img = attraction.img;
    let type = attraction.type;
    let description = attraction.description;
    let city = attraction.city;
    let stateprovince = attraction.stateprovince;
    let country = attraction.country;

    name == "" ? name = this.attraction.name : name = attraction.name;
    img == "" ? img = this.attraction.img : img = attraction.img;
    type == "" ? type = this.attraction.type : type = attraction.type;
    description == "" ? description = this.attraction.description : type = attraction.description;
    city == "" ? city = this.attraction.city : city = attraction.city;
    stateprovince == "" ? stateprovince = this.attraction.stateorprovince : stateprovince = attraction.stateprovince;
    country == "" ? country = this.attraction.country : country = attraction.country;
    
    this.attractionService.editAttraction(name, img, type, description, city, stateprovince, country);
  }

  deleteAttraction(attraction) {
    this.attractionService.deleteAttraction(attraction.id)
  }

}

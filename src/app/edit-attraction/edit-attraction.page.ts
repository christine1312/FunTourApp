import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-attraction',
  templateUrl: './edit-attraction.page.html',
  styleUrls: ['./edit-attraction.page.scss'],
})
export class EditAttractionPage implements OnInit {

  formGroup : FormGroup;

  constructor(public formBuilder: FormBuilder,) { }

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

}

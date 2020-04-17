import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-traveler',
  templateUrl: './add-traveler.page.html',
  styleUrls: ['./add-traveler.page.scss'],
})
export class AddTravelerPage implements OnInit {

  /* new form group for getting input from the user */
  new_traveler_form: FormGroup;

  /* src for traveler image above the form */
  traveler_image = "assets/roadtrip_one.png";

  constructor(
    public formBuilder: FormBuilder,
    private Router: Router
  ) { }

  ngOnInit() {
    /* defining the input parameters for a new traveler */
    this.new_traveler_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      items: new FormControl('', Validators.required),
      needs: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.Router.navigate(['folder/Inbox']);
  }

  addTraveler() {
    this.Router.navigate(['folder/Inbox']);
  }

}

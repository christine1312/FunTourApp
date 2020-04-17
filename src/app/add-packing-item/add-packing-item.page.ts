import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-packing-item',
  templateUrl: './add-packing-item.page.html',
  styleUrls: ['./add-packing-item.page.scss'],
})
export class AddPackingItemPage implements OnInit {

  /* new form group for getting input from the user */
  new_item_form: FormGroup;

  /* src for briefcase image */
  packing_item_image = "assets/packing_item.jpg";

  constructor(
    public formBuilder: FormBuilder,
    private Router: Router
  ) { }

  ngOnInit() {
    /* defining the input parameters for a new packing item */
    this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      who: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.Router.navigate(['folder/Inbox'])
  }

  addItem(item) {
    this.goBack();
  }

}

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-add-packing-item',
  templateUrl: './add-packing-item.page.html',
  styleUrls: ['./add-packing-item.page.scss'],
})
export class AddPackingItemPage implements OnInit {

  /* new form group for getting input from the user */
  new_item_form: FormGroup;

  /* trip the user wants to edit */
  current_trip:any;

  /* src for briefcase image */
  packing_item_image = "assets/packing_item.jpg";

  constructor(
    public formBuilder: FormBuilder,
    public itemServices: ItemsService,
    private Router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* defining the input parameters for a new packing item */
    this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      who: new FormControl('', Validators.required)
    });
    /* get the current trip from edit trip page  */
    this.route.params.subscribe(
      param => {
        this.current_trip = param;
        console.log(this.current_trip);
      }
    )
  }

  goBack() {
    this.Router.navigate(['my-trips']);
  }

  /* calls addItem function from item service to add a new item to the database */
  addItem(item) {
    /* logging input parameters for new item for future reference */
    console.log(item.name);
    console.log(item.category);
    console.log(item.quantity);
    console.log(item.who);
    console.log("trip id: " + this.current_trip.id);
    /* send new item to addItem() in items service */
    this.itemServices.addItem(this.current_trip.id, item.name, item.category, item.quantity, item.who);
    /* send user back to previous page */
    this.goBack();
  }
}

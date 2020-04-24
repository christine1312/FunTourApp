import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attraction-details',
  templateUrl: './attraction-details.page.html',
  styleUrls: ['./attraction-details.page.scss'],
})
export class AttractionDetailsPage implements OnInit {

  attraction: any;

  constructor(private attractionService:AttractionService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(
      param =>{
        this.attraction = param;
        console.log(this.attraction)
      }
    )
  }

}

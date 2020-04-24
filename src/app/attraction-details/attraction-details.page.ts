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
  attractions: any;

  constructor(private attractionService:AttractionService,
    private router: Router,
    private route: ActivatedRoute,
    ) { 
      this.attractionService.getObservable().subscribe((data) => {
        this.attractions = this.attractionService.attractions;
      });
    }

  ngOnInit() {
    this.attractions = this.attractionService.getAttractions();
    this.route.params.subscribe(
      param =>{
        this.attraction = param;
      }
    )
  }


  editAttraction(attraction) {
    this.router.navigate(['/edit-attraction', attraction])
  }

}

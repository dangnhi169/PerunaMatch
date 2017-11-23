import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Listing } from '../listing';
import { Subscription } from 'rxjs/Subscription';
import { ListingService } from '../services/listing.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit{
  listings: Listing[] = [];
  subscription: Subscription;

  @Input() projectId: number


//import ListingService
  constructor(private listingService: ListingService, private route: ActivatedRoute,
  private router:Router) {
  }

  ngOnInit() {
    //get projectID from route
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectId = +params['id'];
        }
      );

      //get all listings matching project id
    this.listingService.getListingsbyProjectId(this.projectId)
                .subscribe(result => {
                      console.log(result);
                      this.listings = result;
                });
  }
}

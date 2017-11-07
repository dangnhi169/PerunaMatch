import { Component, OnInit, OnDestroy } from '@angular/core';
import { Listing } from '../listing';
import { Subscription } from 'rxjs/Subscription';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit, OnDestroy {
  listings: Listing[];
  subscription: Subscription;

//import ListingService
  constructor(private listingService: ListingService) {
  }

  ngOnInit() {
    //listen to see if listings changed, use ListingService to get Listings
    this.subscription = this.listingService.listingsChanged
      .subscribe(
        (listings: Listing[]) => {
          this.listings = listings;
        }
      );
    this.listings = this.listingService.getListings();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }





}

import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { Subscription } from 'rxjs/Subscription';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

/*  favorites: Listing[];
  subscription: Subscription;

  constructor(private listingService: ListingService) { }*/

  ngOnInit() {
    //listen to see if listings changed, use ListingService to get Listings
    /*this.subscription = this.listingService.listingsChanged
    .subscribe(
      (favorites: Listing[]) => {
        this.favorites = favorites;
      }
    );
    this.favorites = this.listingService.getListings();*/
  }

/*  ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/
}

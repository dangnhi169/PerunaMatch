import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Listing } from '../listing';

@Injectable()
export class ListingService {
  listingsChanged = new Subject<Listing[]>();

  private listings: Listing[] = [
    new Listing(
      'Highlight Documents',
      new Date(),
      new Date(),
      ['all'],
      ['hardworker', 'attention to detail'],
      'come highlight documents for me',
      'Professor Lawrimore',
      '1234@smu.edu'),
      
    new Listing(
      'Breaking Bad',
      new Date(),
      new Date(),
      ['Chemistry', 'Law'],
      ['mixing','discreteness', 'attention to detail'],
      'need help in my 100% legal lab',
      'Mr.White',
      'crystal@gmail.com'),
  ];

  constructor(){}

  getListings() {
    return this.listings.slice();
  }

  addListing(listing: Listing) {
    this.listings.push(listing);
    this.listingsChanged.next(this.listings.slice());
  }

  getListing(index: number) {
    return this.listings[index];
  }

  updateListing(index: number, newListing: Listing) {
    this.listings[index] = newListing;
    this.listingsChanged.next(this.listings.slice());
  }

  deleteRecipe(index: number) {
    this.listings.splice(index, 1);
    this.listingsChanged.next(this.listings.slice());
  }
}

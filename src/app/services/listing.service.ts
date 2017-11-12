import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Listing } from '../listing';

@Injectable()
export class ListingService {
  listingsChanged = new Subject<Listing[]>();

  private listings: Listing[] = [
    new Listing(
      'Highlight Documents',
      'come highlight documents for me',
       new Date(),
      new Date(),
      ['all'],
      'Professor Lawrimore',
      '1234@smu.edu'),
    new Listing(
      'Breaking Bad',
      'need help in my 100% legal lab',
       new Date(),
        new Date(),
        ['Chemistry', 'Law'],
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

  deleteListing(index: number) {
    this.listings.splice(index, 1);
    this.listingsChanged.next(this.listings.slice());
  }


}

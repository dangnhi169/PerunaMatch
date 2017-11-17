import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { Listing } from '../listing';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingService {
  private listings: Listing[];

  constructor(private http: Http){}

  getListings(): Observable<Listing[]>{
    return this.http.get('/api/listing', JSON.stringify({}))
    .map((response: Response) => {
        // set token property (which is userid)
        this.listings = response.json().listings;
        console.log(this.listings);
        return this.listings;
    });

  }

  getListingsbyProjectId(id:number): Observable<Listing[]>{
    return this.http.get('/api/listing/' + id, JSON.stringify({}))
    .map((response: Response) => {
        this.listings = response.json().listings;
        return this.listings;
    });

  }

  //listingsChanged = new Subject<Listing[]>();

  /*private listings: Listing[] = [
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
*/
  getListing(index: number) {
    return this.listings[index];
  }
/*
  updateListing(index: number, newListing: Listing) {
    this.listings[index] = newListing;
    this.listingsChanged.next(this.listings.slice());
  }

  deleteListing(index: number) {
    this.listings.splice(index, 1);
    this.listingsChanged.next(this.listings.slice());
  }
*/
}

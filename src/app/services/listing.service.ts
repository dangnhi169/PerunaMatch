import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { Listing } from '../listing';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingService {
  private listings: Listing[];
  private listingAdded: boolean;
  constructor(private http: Http){}
  listingsChanged = new Subject<Listing[]>();
  private listing: Listing;
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

  getListingsbyId(id:number): Observable<Listing>{
    return this.http.get('/api/listing/edit/' + id, JSON.stringify({}))
    .map((response: Response) => {
        this.listing = response.json().listing;
        return this.listing;
    });

  }

  /*addListing(listing:Listing): Observable<Listing> {
      return this.http.post('/api/dash/addListing', listing)
        .map(response => response.json() as Listing)
      }*/
      addListing(listing:Listing): Observable<Listing[]> {
          return this.http.post('/api/dash/addListing', listing)
          .map((response: Response) => {
              this.listings = response.json().listing;
            //  this.listingsChanged.next(this.listings.slice());
              return this.listings;
          });}

      updateListing(listing: Listing): Observable<Listing> {
        console.log("in update lissting");
              return this.http.put('/api/update',listing)
                  .map(response => response.json())
                //  .catch(EmployeeService.handleError);
          }
  deleteListing(id: number): Observable<Listing> {
            return this.http.delete('/api/listing/' + id)
                        .map(response => response.json());

                      //  .//catch(EmployeeService.handleError);
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

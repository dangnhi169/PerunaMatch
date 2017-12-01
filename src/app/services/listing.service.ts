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

  getListingsbyProjectId(id: number): Observable<Listing[]> {
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

      addListing(listing:Listing): Observable<Listing[]> {
          return this.http.post('/api/dash/addListing', listing)
          .map((response: Response) => {
              this.listings = response.json().listing;
              return this.listings;
          });}

      updateListing(listing: Listing): Observable<Listing> {
        console.log("in update lissting");
              return this.http.put('/api/update',listing)
                  .map(response => response.json())
          }
  deleteListing(id: number): Observable<Listing> {
            return this.http.delete('/api/listing/' + id)
                        .map(response => response.json());
                }

  getListing(index: number) {
    return this.listings[index];
  }

}

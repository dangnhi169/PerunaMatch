import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../services/listing.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  item: Listing;
  @Input() id:number;
  subscription: Subscription;

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    //this.subscription = this.listingService.getListing(this.id)
    //.subscribe( value => this.item = value);
    console.log(this.id);
    this.item = this.listingService.getListing(this.id);
    console.log(this.item);

  }

}

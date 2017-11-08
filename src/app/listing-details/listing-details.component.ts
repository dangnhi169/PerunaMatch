import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  @Input() item: Listing;
  @Input() id:number;

  constructor(private listingService: ListingService) { }

  ngOnInit() {
  }

}

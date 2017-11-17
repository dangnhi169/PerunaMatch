import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Listing } from '../listing';

@Component({
  selector: 'listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.css']
})
export class ListingItemComponent implements OnInit {

  @Input() listing: Listing;
  @Input() index: number;


  ngOnInit() {
    console.log(this.listing);
  }


}

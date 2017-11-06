import { Component, OnInit, Input } from '@angular/core';
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
  }

}

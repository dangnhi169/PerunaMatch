import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-favorites-details',
  templateUrl: './favorites-details.component.html',
  styleUrls: ['./favorites-details.component.css']
})
export class FavoritesDetailsComponent implements OnInit {
  @Input() item: Listing;
  @Input() id: number;

  constructor(private listingService: ListingService) { }

  ngOnInit() { }
}

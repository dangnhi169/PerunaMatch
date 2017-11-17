import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../services/listing.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  item: Listing;
  @Input() id:number;
  subscription: Subscription;

  constructor(private listingService: ListingService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.item = this.listingService.getListing(this.id);
  }

}

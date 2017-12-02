import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Listing } from '../listing';
import { ListingDetailsComponent } from '../listing/listing-details/listing-details.component';

@Component({
  selector: 'ngbd-modal-content',
  template: ``,
  styleUrls: ['./modal.component.css']
})
export class NgbdModalContent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}


@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() id:number;
  constructor(private modalService: NgbModal) {}

  open() {
    console.log('In Modal Component');
    const modalRef = this.modalService.open(ListingDetailsComponent);
    modalRef.componentInstance.id = this.id;
  }
}

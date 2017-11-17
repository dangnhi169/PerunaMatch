
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Listing } from '../listing';
import { ListingAddComponent } from '../listing-add/listing-add.component';

@Component({
  selector: 'modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent{

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ListingAddComponent);
  //  modalRef.componentInstance.id = this.id;
  }

}

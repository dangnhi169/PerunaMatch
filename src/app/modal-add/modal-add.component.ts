
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Listing } from '../listing';
import { ListingAddComponent } from '../listing/listing-add/listing-add.component';
//import { DashComponent } from '../dash/dash.component';
@Component({
  selector: 'modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent{
@Input() projectId: number;
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ListingAddComponent);
    modalRef.componentInstance.projectId = this.projectId;
  }

}

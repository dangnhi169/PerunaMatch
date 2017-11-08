import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Listing } from '../listing';
import { ListingDetailsComponent } from '../listing-details/listing-details.component';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <!--<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">-->
    <div class="modal-header">
    <h4 class="modal-title">Modal title</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <!--Hello, {{ name }}-->
  <listing-details [id]="id"></listing-details>

</div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    <button type="button" class="btn btn-secondary">Add to Favorites</button>
  </div>
  <!--</div>
  </div>
  </div>-->`,
  styleUrls: ['./modal.component.css']
})
export class NgbdModalContent implements OnInit {

  @Input() id1:number;
  //@Input() name;
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
    const modalRef = this.modalService.open(ListingDetailsComponent);
  //  modalRef.componentInstance.name = 'world';
    modalRef.componentInstance.id = this.id;
    //console.log(this.id);
  }
}

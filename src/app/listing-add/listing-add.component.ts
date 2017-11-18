
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Component, OnInit,Input } from '@angular/core';

import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ListingService } from '../services/listing.service';
import { Listing } from '../listing';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit {
  form: FormGroup;
  model:number[];
  @Input() projectId: number;

  myOptions: IMultiSelectOption[] = [
    { id: 'Computer Science', name: 'Computer Science' },
    { id: 'Math', name: 'Math' },
    { id: 'Physics', name: 'Physics' },
    { id: 'Geology', name: 'Geology' },

  ];


  constructor(private fb: FormBuilder, private listingService: ListingService,
  public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.initForm();
    this.form.controls['optionsModel'].valueChanges
            .subscribe((selectedOptions) => {
                // changes
            });
  }

  private initForm() {
    let listtitle = '';
    let listdes = '';
    let stdate = '';
    let endate = '';
    let majors = [];
    let cname = '';
    let cemail = '';


    this.form = new FormGroup({
      'title': new FormControl(listtitle, Validators.required),
      'des': new FormControl(listdes, Validators.required),
      'sdate': new FormControl(stdate, Validators.required),
      'edate': new FormControl(endate, Validators.required),
      'majors': new FormControl(majors, Validators.required),
      'cname': new FormControl(cname, Validators.required),
      'cemail': new FormControl(cemail, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.form.value);

    const newListing = {
      projectId: this.projectId,
      title: this.form.value['title'],
      description: this.form.value['des'],
      start: this.form.value['sdate'],
      end: this.form.value['edate'],
      majors: this.form.value['majors'],
      contactName: this.form.value['cname'],
      contactEmail:this.form.value['cemail']
    }
      //console.log(newListing);
      this.listingService.addListing(newListing);
      this.form.reset();
    }

  }
  /*  this.listingService.addListing(newListing);
    this.form.reset();
  }

}*/


import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Component, OnInit } from '@angular/core';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NgForm, NgModel, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit {
  form: FormGroup;
  model:number[];
  myOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },

  ];


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      sdate: '',
      edate: '',
      majors: [1,2],
    });

    this.form.controls['optionsModel'].valueChanges
            .subscribe((selectedOptions) => {
                // changes
            });
  }




}

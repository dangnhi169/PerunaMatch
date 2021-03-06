
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Component, OnInit,Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { Listing } from '../../listing';
import { DashComponent } from '../../dash/dash.component';

@Component({
  providers:[DashComponent],
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit{
  nextid = 4;
  form: FormGroup;
  model:number[];
  projectId: number;
  posterId:number;

  myOptions: IMultiSelectOption[] = [
    { id: 'Computer Science', name: 'Computer Science' },
    { id: 'Math', name: 'Math' },
    { id: 'Physics', name: 'Physics' },
    { id: 'Geology', name: 'Geology' },

  ];


  constructor(private fb: FormBuilder, private listingService: ListingService,
  private router: Router, private comp: DashComponent,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe(
        (params: Params) => {

          this.posterId = +params['pid'];
          this.projectId = +params['id'];

        }
      );

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
      id:this.nextid,
      projectId: this.projectId,
      title: this.form.value['title'],
      description: this.form.value['des'],
      start: this.form.value['sdate'],
      end: this.form.value['edate'],
      majors: this.form.value['majors'],
      contactName: this.form.value['cname'],
      contactEmail:this.form.value['cemail']
    }
      this.nextid++;
      this.listingService.addListing(newListing);
      this.form.reset();
      this.router.navigateByUrl('/dash/' + this.posterId);

    }

  }

import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ListingService } from '../services/listing.service';
import { Listing } from '../listing';
@Component({
  selector: 'app-listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: ['./listing-edit.component.css']
})
export class ListingEditComponent implements OnInit {
 listingid : number
 listing : Listing
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
  private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.listingid = +params['id'];
          this.posterId = +params['pid'];
        }
      );
      console.log(this.listingid);
      this.form = new FormGroup({
        'title': new FormControl(Validators.required),
        'des': new FormControl(Validators.required),
        'sdate': new FormControl(Validators.required),
        'edate': new FormControl( Validators.required),
        'majors': new FormControl( Validators.required),
        'cname': new FormControl( Validators.required),
        'cemail': new FormControl( Validators.required)
    });

      this.callService();
    }
    callService(){
      this.listingService.getListingsbyId(this.listingid)
                  .subscribe(result => {
                        console.log(result);
                        this.listing = result;
                        this.addFormValues();
                  });

    }

    addFormValues(){
      console.log(this.listing.start,this.listing.end);
      this.form.setValue({
        title : this.listing.title,
        des : this.listing.description,
        sdate : this.listing.start,
        edate : this.listing.end,
        majors : this.listing.majors,
        cname : this.listing.contactName,
        cemail : this.listing.contactEmail,

      });
    }

    onSubmit(){
      const newListing = {
        id:this.listing.id,
        projectId: this.listing.projectId,
        title: this.form.value['title'],
        description: this.form.value['des'],
        start: this.form.value['sdate'].toDate(),
        end: this.form.value['edate'].toDate(),
        majors: this.form.value['majors'],
        contactName: this.form.value['cname'],
        contactEmail:this.form.value['cemail']
      }

        this.listingService.updateListing(newListing);
        this.form.reset();
        this.router.navigateByUrl('/dash/' + this.posterId);

      }

      close(){
      this.router.navigateByUrl('/dash/' + this.posterId);
      }

    }

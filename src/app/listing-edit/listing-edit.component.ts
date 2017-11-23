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
 //@Input( projectId: number;
//  @ViewChild(DashComponent) myDC: DashComponent;

 myOptions: IMultiSelectOption[] = [
   { id: 'Computer Science', name: 'Computer Science' },
   { id: 'Math', name: 'Math' },
   { id: 'Physics', name: 'Physics' },
   { id: 'Geology', name: 'Geology' },

 ];
  constructor(private fb: FormBuilder, private listingService: ListingService,
  /*public activeModal: NgbActiveModal,*/private router: Router,
  private route: ActivatedRoute) { }

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
      //this.initForm();
    }
  /*  private initForm() {
      //this.listingService.getListingsbyId(this.listingid)
      //            .subscribe(result => {
      //                  console.log(result);
      //                  this.listing = result;
       //           });
      //console.log(this.listing);
      /*let listtitle = this.listing.title;
      let listdes = this.listing.description;
      let stdate = this.listing.start;
      let endate = this.listing.end;
      let majors = this.listing.majors;
      let cname = this.listing.contactName;
      let cemail = this.listing.contactEmail;*/

      /*let listtitle = '';
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
      });*/

      /*this.form = new FormGroup({
        'title': new FormControl(Validators.required),
        'des': new FormControl(Validators.required),
        'sdate': new FormControl(Validators.required),
        'edate': new FormControl( Validators.required),
        'majors': new FormControl( Validators.required),
        'cname': new FormControl( Validators.required),
        'cemail': new FormControl( Validators.required)
    });*/
  //}

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
      //console.log(this.form.value);
      //console.log(this.form.value['sdate'].toDate());
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
        //console.log(newListing);
        console.log(newListing.start);
        console.log(newListing.end);
        //this.nextid++;
        this.listingService.updateListing(newListing);
        this.form.reset();
        this.router.navigateByUrl('/dash/' + this.posterId);

      //  this.router.navigateByUrl('');
      //  this.router.navigateByUrl('/dash/' + this.projectId);

      }

    //  refresh(){
    //    this.myDC.refreshFromParent();
    //  }
      close(){
      this.router.navigateByUrl('/dash/' + this.posterId);
      //  console.log("close");
      //  this.activeModal.close('Close click');
    //    this.refresh();
    //    this.comp.reloadListings();
      }

    }

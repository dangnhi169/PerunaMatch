
import { IMultiSelectOption,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ListingService } from '../services/listing.service';
import { Listing } from '../listing';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../models/project';
import { SearchService } from '../services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit {
  form: FormGroup;
  model:number[];
//  @Input() projectId: number;
//  @Input() listId: string;
@Input() activeProjects: Project[];
  private editing = false;



  myOptions: IMultiSelectOption[] = [
    { id: 'Computer Science', name: 'Computer Science' },
    { id: 'Math', name: 'Math' },
    { id: 'Physics', name: 'Physics' },
    { id: 'Geology', name: 'Geology' },

  ];

  mySettings: IMultiSelectSettings = {
  //  enableSearch: true,
  //  checkedStyle: 'fontawesome',
    //buttonClasses: 'btn btn-default btn-block',
    selectionLimit: 1,
  //  displayAllSelectedText: true
};
private apl: IMultiSelectOption[] = [];




  constructor(private fb: FormBuilder, private listingService: ListingService,
  public activeModal: NgbActiveModal, private searchService: SearchService,private router: Router
  ) { }

  ngOnInit() {

    this.initForm();
  //  console.log(this.activeProjects.length)
  if(this.activeProjects.length > 0){
    for (var k = 0; k < this.activeProjects.length; k++) {
            let tmp: IMultiSelectOption = { id: this.activeProjects[k].projectID,
              name: this.activeProjects[k].name };
            this.apl.push(tmp);
          }}
    //this.form.controls['optionsModel'].valueChanges
    //        .subscribe((selectedOptions) => {
                // changes
    //        });

  }

  private initForm() {
    let ap = [];
    let listtitle = '';
    let listdes = '';
    let stdate = '';
    let endate = '';
    let majors = [];
    let cname = '';
    let cemail = '';


    this.form = new FormGroup({
      'pl': new FormControl(ap, Validators.required),
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
    let listingOperation:Observable<Listing>;
    //console.log(this.form.value['pl'][0]);
    const newListing = {
      //FIx projectId: this.projectId,
      id:99,
      projectId: +this.form.value['pl'][0],
      //projectId: 0,
      title: this.form.value['title'],
      description: this.form.value['des'],
      start: this.form.value['sdate'],
      end: this.form.value['edate'],
      majors: this.form.value['majors'],
      contactName: this.form.value['cname'],
      contactEmail:this.form.value['cemail']
    }
      console.log(newListing);
      //if(!this.editing){
       this.listingService.add(newListing)
        .subscribe(x => this.onListingSaved(x));;
    //  this.searchService.getProjectsbyPosterId(this.posterId)
      this.form.reset();
    }
public onListingSaved(listing:Listing){
  console.log(listing);
  this.router.navigateByUrl('/login');
}
      /*// Subscribe to observable
       listingOperation.subscribe(
                               comments => {
                                   // Emit list event
                                   EmitterService.get(this.listId).emit(comments);

                               },
                               err => {
                                   // Log errors if any
                                   console.log(err);
                               });*/
   }
    //}

  //}
  /*  this.listingService.addListing(newListing);
    this.form.reset();
  }

}*/

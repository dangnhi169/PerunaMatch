import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ListingService } from '../services/listing.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from '../services/search.service';

import { Project } from '../../models/project';
import { Listing } from '../listing';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
    projects: Project[];
    projectId: number = -1;
    posterId:number;
    listings: Listing[] = [];
  //  subscription: Subscription;
  //  @Input() listId: string;
  constructor(private searchService: SearchService, private route: ActivatedRoute,
  private router:Router, private listingService: ListingService) { }

  ngOnInit() {

    this.route.params.subscribe(x => this.onRouteParams(x));
    console.log(this.projectId);

  }
  private onRouteParams(params: any) {
    this.posterId = +params.id;
    this.searchService.getByPosterId(this.posterId)
        .subscribe(x => this.onDashLoaded(x));

  }

  private onDashLoaded(projects: Project[]) {
  this.projects = projects;
  console.log(this.projects);
  //if(this.projects.length > 0){
    //console.log(this.projects[0].projectID);
  for(var k = 0; k < this.projects.length; k++){
    this.projectId = this.projects[k].projectID;
    //if(this.projectId != -1){
      this.listingService.getByProjectId(this.projectId)
      .subscribe(x => this.onListingLoaded(x));
    }
  //  }
  //}
}

  private onListingLoaded(listings: Listing[]){
    console.log(this.listings);
    for(var k = 0; k < listings.length; k++){
      let l = listings[k];
      this.listings.push(l);
    }
    //this.listings = listings;
  }
  //console.log(this.product);
}
  //  this.searchService.getByPosterId()
    //  .subscribe(x => this.onProductsLoaded(x));}
    /*this.route.params
      .subscribe(
        (params: Params) => {
          this.posterId = +params['id'];
        }
      );*/


//this.loadProjectsandListings();

    //  this.subscription = this.listingService.listingsChanged
    //  .subscribe(
    //    (listings: Listing[]) => {
    //      this.listings = listings;
    //    }
  //    );
    //  this.listings = this.listingService.getListingsChanged();

    //  this.loadProjectsandListings();
      /*//get all projects and listings matching poster id
    this.searchService.getProjectsbyPosterId(this.posterId)
                .subscribe(result => {
                      console.log(result);
                      this.projects = result[0];
                      this.listings = result[1];
                      console.log(this.projects);
                      console.log(this.listings);
                });*/


  /*loadProjectsandListings(){
    this.searchService.getProjectsbyPosterId(this.posterId)
                .subscribe(result => {
                      console.log(result);
                      this.projects = result[0];
                      this.listings = result[1];
                      console.log(this.projects);
                      console.log(this.listings);
                });
*/


  /*ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        //EmitterService.get(this.listId).subscribe((any:any[]) => { this.loadProjectsandListings()});
        this.loadProjectsandListings();
    }*/
  //}

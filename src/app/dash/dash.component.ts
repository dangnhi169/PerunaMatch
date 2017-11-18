import { Component, OnInit } from '@angular/core';
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
    projectId: number;
    posterId:number;
    listings: Listing[];
  constructor(private searchService: SearchService, private route: ActivatedRoute,
  private router:Router, private listingService: ListingService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.posterId = +params['id'];
        }
      );

      //get all listings matching project id
    this.searchService.getProjectsbyPosterId(this.posterId)
                .subscribe(result => {
                      console.log(result);
                      this.projects = result[0];
                      this.listings = result[1];
                      console.log(this.projects);
                      console.log(this.listings);
                });
  }

/*getListings(projectId:number){
  console.log('herh');
  this.listingService.getListingsbyProjectId(this.projectId)
              .subscribe(result => {
                    console.log(result);
                    this.listings = result;
              });
}*/
  }

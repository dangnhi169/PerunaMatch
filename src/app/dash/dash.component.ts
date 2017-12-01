import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ListingService } from '../services/listing.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { SearchService } from '../services/search.service';

import { Project } from '../../models/project';
import { Listing } from '../listing';
import { ListingAddComponent } from '../listing/listing-add/listing-add.component';
import { Observable } from 'rxjs/Observable';
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
    subscription: Subscription;
    newProject: Project;

  constructor(private searchService: SearchService, private route: ActivatedRoute,
  private router:Router, private listingService: ListingService,
  private projectService: ProjectService) { }

  ngOnInit() {
    this.start();
    this.newProject = new Project();
  }
  start(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.posterId = +params['id'];
        }
      );
      //get all listings matching project id
    this.searchService.getProjectsbyPosterId(this.posterId)
                .subscribe(result => {
                      this.projects = result[0];
                      this.listings = result[1];
                });
  }

  delete(id:number){
    console.log("delete");
    this.listingService.deleteListing(id);
    this.start();
  }

  openModal(): void {
    $('#myModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var modal = $(this);
     })
  }

  addProject(): void {
    var curUserID = JSON.parse(localStorage.getItem('currentUser'));
    // make sure only the current user can post new project
    if(Number(curUserID.token) == this.posterId){
      this.newProject.posterID = this.posterId;
      for(var k = 0; k < this.newProject.tag.length; k++){
        this.newProject.tag[k] = this.newProject.tag[k]["display"];
      }
      this.projectService.addNewProject(this.newProject)
            .subscribe(result => {
                this.projects = result;
                this.refresh();
            });
    }
  }

  deleteProject(id: number): void {
    var curUserID = JSON.parse(localStorage.getItem('currentUser'));
    var projectID = this.projects[id].projectID;
    // make sure only the current user can post new project
    if(Number(curUserID.token) == this.posterId){
      this.projectService.deleteProject(projectID)
            .subscribe(result => {
                this.projects = result;
                this.refresh();
            });
    }
  }

  refresh() {
    this.searchService.getProjectsbyPosterId(this.posterId)
                .subscribe(result => {
                      this.projects = result[0];
                      this.listings = result[1];
                });
  }

}

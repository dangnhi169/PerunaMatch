import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../services/search.service';
import { Project } from '../../models/project';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    private projects: Project[];
    constructor(private searchService: SearchService) {

    }

    ngOnInit(){
          this.searchService.getProjects()
              .subscribe(result => {
                    console.log(result);
                    this.projects = result;
              });
    }

    



}

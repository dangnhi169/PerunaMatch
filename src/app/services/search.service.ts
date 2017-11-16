import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Project } from '../../models/project';

@Injectable()
export class SearchService {
  private projects: Project[];
    
  constructor(private http: Http) { 

  }

  getProjects(): Observable<Project[]>{
    return this.http.get('/api/projects', JSON.stringify({}))
    .map((response: Response) => {
        // set token property (which is userid)
        this.projects = response.json().projects;
        console.log(this.projects);
        return this.projects;
    });
  }

}
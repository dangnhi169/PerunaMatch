import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Project } from '../../models/project';

@Injectable()
export class ProjectService {

  projectsForCurUser: Project[];
  constructor(private http: Http){}

  addNewProject(newProject: Project): Observable<Project[]>{
    return this.http.post('/api/dash/addProject', JSON.stringify(newProject))
    .map((response: Response) => {
        this.projectsForCurUser = response.json().projects;
        console.log("================" + this.projectsForCurUser);
        return this.projectsForCurUser;
    });

  }

  deleteProject(id: number): Observable<Project[]>{
    return this.http.delete('/api/project/' + id)
    .map((response: Response) => {
        this.projectsForCurUser = response.json().projects;
        return this.projectsForCurUser;
    });
  }

}

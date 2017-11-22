import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Project } from '../../models/project';
import { Listing } from '../listing';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  private projects: Project[];
  private listings: Listing[];
  constructor(private http: Http, protected httpClient: HttpClient) {

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
  getProjectsbyPosterId(id:number): Observable<any[]>{
    return this.http.get('/api/dash/' + id, JSON.stringify({}))
    .map((response: Response) => {
        this.projects = response.json().projects;
        this.listings = response.json().listings;
        console.log(this.projects);
        console.log(this.listings);
        return [this.projects, this.listings];
    });

  }

  getByPosterId(id: number): Observable<Project[]> {
      return this.httpClient
          .get<Project[]>(`${'api/projects'}/?posterID=${id}`)
          .catch(x => this.handleException(x));
  }

  protected handleException(exception: any) {
      var message = `${exception.status} : ${exception.statusText}\r\n${exception.body.error}`;
      alert(message);
      return Observable.throw(message);
  }


}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { User } from '../../models/user';
@Injectable()
export class UserService {

    private user: User;
    constructor(private http: Http, private authenticationService: AuthenticationService) { }
    // to get all users
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }

        // to get a SINGLE user
    getUser(id: number): Observable<User> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/user/' + id, JSON.stringify({}))
        .map((response: Response) => {
            this.user = response.json().matchedUser;
            return this.user;
        });
    }
}

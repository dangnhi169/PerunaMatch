import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class SignUpService {
    private token: string;
    constructor(private http: Http) { }
    signup(userInfo: any): Observable<boolean> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({headers: headers});

        return this.http.put('http://18.216.69.61/signup', JSON.stringify(userInfo), options)
            .map((response: Response) => {
                const status = response.status;
                if (status === 401) {
                    return false;
                } else {
                    // set token property (which is userid)
                    this.token = response.json().userId;
                    // save userID
                    localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
                    return true;
                }
            },
            err => {
                console.log(err);
            }
        );
    }
}

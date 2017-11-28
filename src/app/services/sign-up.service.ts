import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class SignUpService {
    private token: string;
    constructor(private http: Http) { }
    signup(userInfo: any): Observable<boolean> {
        return this.http.put('/api/user', JSON.stringify(userInfo))
            .map((response: Response) => {
                const status = response.status;
                if (status === 401) {
                    return false;
                } else {
                    // set token property (which is userid)
                    this.token = response.json().token;
                    // save userID
                    localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
                    return true;
                }
            });
    }
}

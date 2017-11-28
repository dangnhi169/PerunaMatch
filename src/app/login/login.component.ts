import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.service';
 
@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})
 
export class LoginComponent implements OnInit {
    private model: any = {username: '', password: ''};
    private loading: boolean;
    private error: string;
 
    constructor(private router: Router, private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        this.error = '';
        this.loading = false;
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    var id = localStorage.getItem('currentUser');
                    console.log(id);
                    this.router.navigate(['/profile']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    isLoading() {
        return this.loading;
    }
}

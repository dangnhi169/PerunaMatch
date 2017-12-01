import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})
 
export class LoginComponent implements OnInit {
    private model: any = {username: '', password: ''};
    private loading: boolean;
    private error: string;

    constructor(private router: Router, private authenticationService: AuthenticationService, private sharedService: SharedService) { }

    ngOnInit() {
        this.error = '';
        this.loading = false;
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            result => {
                this.sharedService.emitChange(true);
                this.router.navigate(['/home']);
            },
            error => {
                this.sharedService.emitChange(false);
                this.error = 'Username or password is incorrect';
                this.loading = false;
            });
    }

    isLoading() {
        return this.loading;
    }
}

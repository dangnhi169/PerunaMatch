import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService} from '../services/shared.service';
import { User } from '../../models/user';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})
 
export class LoginComponent implements OnInit {
    private model: any = {username: '', password: ''};
    private loading: boolean;
    private error: string;
    private user: User;

    constructor(private router: Router, private authenticationService: AuthenticationService, 
    private sharedService: SharedService, private userService: UserService) { }

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
                var currentUser: string = JSON.parse(localStorage.getItem('currentUser')).token;
                var id: number = parseInt(currentUser);
                this.userService.getUser(id)
                    .subscribe(result => {
                        this.user = result;
                        this.sharedService.emitChange(true);
                        if(this.user.isProfessor){
                            this.router.navigate(['/dash/' + id]);
                        } else {
                            this.router.navigate(['/home']);
                        }
                    });
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

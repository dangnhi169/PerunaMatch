import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { User } from '../../models/user';

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
    user: User;
    userId : number;
    success: boolean;
    constructor(private router: Router, private authenticationService: AuthenticationService,private userService: UserService) { }
 
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
                  this.success = result;
              /*  if (result === true) {
                    //console.log("Can login");
                    this.getUser();
                    console.log(this.user);
                  //  if(this.user.isProfessor){
                    //  console.log("Professor");
                  //    this.router.navigateByUrl('/dash/' + this.userId);
                  //  }
                  //  else{
                      this.router.navigateByUrl('/user/' + this.userId);
                //  }
                    //this.router.navigate(['/profile']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }*/
            });
                if (this.success === true) {
                    this.user = this.getUser();
                    console.log(this.user);
                    this.router.navigateByUrl('/user/' + this.userId);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
    }

    isLoading() {
        return this.loading;
    }

    getUser(){
      console.log("In user");
      var curUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = curUser["token"];
      var userc;
      this.userService.getUser(this.userId)
      .subscribe(result => {
        userc = result;
      });
      return userc;

      }
    }

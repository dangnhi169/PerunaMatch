import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../_guard/index';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user : User;
  userId : number;
  constructor(private userService: UserService, private authGuard: AuthGuard, private router: Router) { }

  ngOnInit() {

  /*  var curUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(curUserID);
    this.userId = curUser["token"];
    //console.log(ui);
    this.user = this.userService.getUser(this.userId);
    console.log(this.user);*/
  }

  /*getUser(){
    var curUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(curUserID);
    this.userId = curUser["token"];
    //console.log(ui);
    this.user = this.userService.getUser(this.userId);
    console.log(this.user);
  }*/
  changeRoute(){
       if(this.authGuard.canActivate()){
         console.log("CHange route");
        //   this.getUser();
          // this.router.navigateByUrl('/dash/' + this.userId);
          this.router.navigate(['/profile']);
       } else {
           this.router.navigate(['/login']);
       }
  }

}

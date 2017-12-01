
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  user: User;
  userId: number;

  constructor(private userService: UserService, private router: Router,
    private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private sharedService: SharedService) { }

  ngOnInit() {

    var currentUser: string = JSON.parse(localStorage.getItem('currentUser')).token;
    var id: number = parseInt(currentUser);

    this.userService.getUser(id)
    .subscribe(result => {
      // console.log(result);
      this.user = result;
      console.log(this.user);
    });

  }

  logout() {
    // on logout, return to home
    this.sharedService.emitChange(false);
    this.authenticationService.logout();
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}

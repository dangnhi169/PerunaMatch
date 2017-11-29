
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  user: User;
  userId: number;

  constructor(private userService: UserService, private router: Router,
    private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    // get userId from route
    this.route.params
    .subscribe(
      (params: Params) => {
        this.userId = + params['id'];
      }
    );

    this.userService.getUser(this.userId)
    .subscribe(result => {
      // console.log(result);
      this.user = result;
      console.log(this.user);
    });

  }

  dash(){
    this.router.navigateByUrl('/dash/' + this.userId);
  }
  logout() {
    // on logout, return to home
        this.authenticationService.logout();
        localStorage.clear();
        this.router.navigate(['/home']);
  }

}

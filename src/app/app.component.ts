import { Component } from '@angular/core';

import { User } from '../models/user';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AuthGuard } from './_guard/index';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ]
})
export class AppComponent {

       constructor(private userService: UserService, private authGuard: AuthGuard, private router: Router) { }

       ngOnInit() {

       }

       changeRoute(){
            if(this.authGuard.canActivate()){
                this.router.navigate(['/profile']);
            } else {
                this.router.navigate(['/login']);
            }
       }

}

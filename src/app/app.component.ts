import { OnInit, Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AuthGuard } from './_guard/index';
import { Observable } from 'rxjs';
import { SharedService } from './services/shared.service';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ]
})
export class AppComponent {

    isLoggedIn: Observable<boolean>;

    constructor(private userService: UserService, private authGuard: AuthGuard, private router: Router,
        private sharedService: SharedService) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.sharedService.changeEmitted$.subscribe(
            response => {
                this.isLoggedIn = response;
                console.log(response);
            });
    }

}

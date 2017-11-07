import { Component } from '@angular/core';

import { User } from '../models/user';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ]
})
export class AppComponent {

    users: User[] = [];
    
       constructor(private userService: UserService) { }
    
       ngOnInit() {
           // get users from secure api end point
           this.userService.getUsers()
               .subscribe(users => {
                   this.users = users;
               });
       }

}

import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { SignUpService } from '../services/sign-up.service';
import { EmailValidator } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

    private model: any;
    private loading: boolean;
    private error: string;

    constructor(private router: Router, private signupService: SignUpService,
      private sharedService: SharedService){
        this.model = {username: '', password: '', email: '', userID: '', isProfessor: false};
        this.loading = false;
        this.error = '';
    }

    signup(){
        this.loading = true;
        this.signupService.signup(this.model)
            .subscribe(result => {
                if (result === true) {
                    this.sharedService.emitChange(true);
                    this.router.navigate(['/profile']);
                } else {
                    this.error = 'The above username and/or userid is taken';
                    this.loading = false;
                }
            });
    }

    isLoading(){
        return this.loading;
    }
 }

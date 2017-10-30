import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {SignUpComponent} from './SignUp/sign-up.component';

@NgModule({
    imports: [ 
        BrowserModule 
    ], 
    declarations: [ 
        AppComponent,
        SignUpComponent,
        LoginComponent
    ], 
    bootstrap: [ 
        AppComponent 
    ]
})
export class AppModule {

}

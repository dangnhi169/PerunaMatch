import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {SignUpComponent} from './SignUp/sign-up.component';

@NgModule({
    imports: [ 
        BrowserModule 
    ], 
    declarations: [ 
        AppComponent,
        SignUpComponent 
    ], 
    bootstrap: [ 
        AppComponent 
    ]
})
export class AppModule {
    
}
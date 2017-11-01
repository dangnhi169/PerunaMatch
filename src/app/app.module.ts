import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//added components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { HomeComponent } from './home/home.component';

//added Modules
import { RoutingModule } from './routing.module';

@NgModule({
<<<<<<< HEAD
    imports: [ 
        BrowserModule 
    ], 
    declarations: [ 
        AppComponent,
        HomeComponent
    ], 
    bootstrap: [ 
        AppComponent,
        HomeComponent
=======
    imports: [
        BrowserModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        SignUpComponent,
        LoginComponent,
        HomeComponent
    ],
    bootstrap: [
        AppComponent
>>>>>>> master
    ]
})
export class AppModule {

}

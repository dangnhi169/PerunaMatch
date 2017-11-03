import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//added components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';


//added Modules
import { RoutingModule } from './routing.module';

@NgModule({

    imports: [
        BrowserModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        SignUpComponent,
        LoginComponent,
        HomeComponent,
        ProfilePageComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }

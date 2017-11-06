import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//added components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';


//added Modules
import { RoutingModule } from './modules/routing.module';
import { ListingListComponent } from './listing-list/listing-list.component';
import { ListingItemComponent } from './listing-item/listing-item.component';

//added services
import { ListingService } from  './services/listing.service';

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
        ProfilePageComponent,
        ListingListComponent,
        ListingItemComponent
    ],
    providers: [ListingService],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }

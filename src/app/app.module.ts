


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormGroup,FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';

//added components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ListingListComponent } from './listing-list/listing-list.component';
import { ListingItemComponent } from './listing-item/listing-item.component';

//added Modules
import { RoutingModule } from './modules/routing.module';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from 'angular-io-datepicker';
import { OverlayModule } from 'angular-io-overlay';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// used to create fake backend
import { fakeBackendProvider } from './_helper/fake-backend';
import { AuthGuard } from './_guard/auth.guard';

//added services
import { ListingService } from  './services/listing.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ModalComponent, NgbdModalContent } from './modal/modal.component';
import { SignUpService} from './services/sign-up.service';

import { ListingAddComponent } from './listing-add/listing-add.component';
import { ModalAddComponent } from './modal-add/modal-add.component';



@NgModule({

    imports: [
        BrowserModule,
        RoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        OverlayModule,
        DatePickerModule,
        MultiselectDropdownModule,
        AngularFontAwesomeModule,
        NgbModule.forRoot(),

    ],
    declarations: [
        AppComponent,
        SignUpComponent,
        LoginComponent,
        HomeComponent,
        ProfilePageComponent,
        ListingListComponent,
        ListingItemComponent,
        ListingDetailsComponent,
        ModalComponent,
        NgbdModalContent,
        ListingAddComponent,
        ModalAddComponent

    ],
    providers: [
        ListingService,
        AuthGuard,
        AuthenticationService,
        UserService,
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        SignUpService
    ],
    entryComponents: [NgbdModalContent,ListingDetailsComponent],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }

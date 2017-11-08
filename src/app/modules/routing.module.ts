import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../SignUp/sign-up.component';
import { HomeComponent } from '../home/home.component';
import { ListingListComponent } from '../listing-list/listing-list.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { AuthGuard } from '../_guard/index';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'listings', component: ListingListComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]}
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]

})

export class RoutingModule{}

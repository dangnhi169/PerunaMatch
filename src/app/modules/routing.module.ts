import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../SignUp/sign-up.component';
import { HomeComponent } from '../home/home.component';
import { ListingListComponent } from '../listing-list/listing-list.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { ListingAddComponent } from '../listing-add/listing-add.component';
import { AuthGuard } from '../_guard/index';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'listing/:id', component: ListingListComponent},
  // duplicate for now, remove /profile in the future
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'add', component: ListingAddComponent},
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]

})

export class RoutingModule { }

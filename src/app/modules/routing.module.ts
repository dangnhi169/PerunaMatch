import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../SignUp/sign-up.component';
import { HomeComponent } from '../home/home.component';
import { ListingListComponent } from '../listing/listing-list/listing-list.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { FavoritesListComponent } from '../favorites-list/favorites-list.component';

import { ListingAddComponent } from '../listing/listing-add/listing-add.component';
import { DashComponent } from '../dash/dash.component';
import { AuthGuard } from '../_guard/index';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ListingEditComponent } from '../listing/listing-edit/listing-edit.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'listing/:id', component: ListingListComponent},
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'add', component: ListingAddComponent},
  { path: 'dash/:id', component: DashComponent},
  { path: 'add/:pid/:id', component: ListingAddComponent},
  { path: 'edit/:pid/:id', component: ListingEditComponent},

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]

})

export class RoutingModule { }

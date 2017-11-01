import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { DomainModule } from '../../domain';

import {SignUpComponent} from './sign-up.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        SignUpComponent
    ],
    exports: [
        SignUpComponent
    ]
})
export class StoreModule {

}
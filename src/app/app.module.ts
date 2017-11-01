import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
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
    ]
})
export class AppModule {
    
}
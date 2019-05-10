import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {CardComponent} from './card-holder/card/card.component';
import {CardHolderComponent} from './card-holder/card-holder.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {IssueHolderComponent} from './issues-holder/issue-holder.component';
import {IssueComponent} from './issues-holder/issue/issue.component';
import {MatProgressBarModule} from "@angular/material";
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ProgressBarInterceptorService} from "./interceptor/progress-bar-interceptor.service";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SearchInputComponent,
        CardComponent,
        CardHolderComponent,
        LandingPageComponent,
        IssueHolderComponent,
        IssueComponent,
        ProgressBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatProgressBarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProgressBarInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

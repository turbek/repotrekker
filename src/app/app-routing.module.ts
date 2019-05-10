import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {CardHolderComponent} from "./card-holder/card-holder.component";
import {IssueHolderComponent} from "./issues-holder/issue-holder.component";

const routes: Routes = [
    { path: '', component:  LandingPageComponent },
    { path: 'search/:repository', component: CardHolderComponent },
    { path: 'repository/:user/:repository/issues', component: IssueHolderComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

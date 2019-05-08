import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {CardHolderComponent} from "./card-holder/card-holder.component";

const routes: Routes = [
    { path: '', component:  LandingPageComponent },
    { path: 'search/:repository', component: CardHolderComponent },
    //{ path: 'edit/:postId', component: PostCreateComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

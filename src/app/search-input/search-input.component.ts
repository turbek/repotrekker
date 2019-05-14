import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {GithubService} from "../services/github.service";
import {Router} from "@angular/router";

/**
 * Renders the search bar
 */
@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

    query = new FormControl('');

    constructor(
        private githubService: GithubService,
        private router: Router
    ) {
    }

    /**
     * navigates to the repository view after an input
     */
    getRepositories() {
        this.router.navigateByUrl(`/search/${this.query.value}`);
    }
}

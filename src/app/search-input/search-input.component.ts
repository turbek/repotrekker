import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {GithubService} from "../services/github.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

    query = new FormControl('');

    constructor(
        private githubService: GithubService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    getRepositories() {
        this.githubService.loadRepositoriesByName(this.query.value);
    }

    navigateToCards() {
        this.router.navigateByUrl(`/search/${this.query.value}`);
    }
}

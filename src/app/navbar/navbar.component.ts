import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {GithubService} from "../services/github.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(
        private location: Location,
        private githubService: GithubService
    ) {
    }

    isIssuesPageActive(){
        return this.location.path().includes('issues');
    }

    getSearchedRepositoryName(){
        return this.githubService.getSearchedRepositoryName();
    }

    getCurrentRepositoryName(){
        let currentRepositoryNames = this.githubService.getCurrentRepositoryDetails();
        return `${currentRepositoryNames.userName}/${currentRepositoryNames.repositoryName}`;
    }
}

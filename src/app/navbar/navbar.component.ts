import {Component, HostListener, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GithubService} from "../services/github.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public innerWidth: number;
    isInputTriggered: boolean;

    constructor(
        private location: Location,
        private githubService: GithubService
    ) {
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
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

    isSearchInputShown() {
        return this.location.path() !== '' && this.innerWidth > 500;
    }

    triggerSearchInput() {
        this.isInputTriggered = !this.isInputTriggered;
    }
}

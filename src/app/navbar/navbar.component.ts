import {Component, HostListener, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GithubService} from "../services/github.service";

/**
 * Renders the navigation bar
 */
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

    /**
     * Stores the width of the window after it's been resized
     *
     */
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    /**
     * Checks whether the component is on the issues view
     *
     * @return Boolean
     */
    isIssuesPageActive(){
        return this.location.path().includes('issues');
    }

    /**
     * Returns the loaded repository's name or the name of the repository which is currently viewed
     *
     * @return String
     */
    getSearchedRepositoryName(){
        return this.githubService.getSearchedRepositoryName();
    }

    /**
     * Returns the details of the currently viewed repository concatenated
     *
     * @return String "userName/repoName"
     */
    getCurrentRepositoryName(){
        let currentRepositoryNames = this.githubService.getCurrentRepositoryDetails();
        return `${currentRepositoryNames.userName}/${currentRepositoryNames.repositoryName}`;
    }

    /**
     * Returns whether the search bar should be displayed
     *
     * @return Boolean
     */
    isSearchInputShown() {
        return this.location.path() !== '' && this.innerWidth > 500;
    }

    /**
     * Return whether the search icon should be displayed
     *
     * @return Boolean
     */
    isSearchIconShown() {
        return this.location.path() !== '' && this.innerWidth < 500;
    }

    /**
     * Negates the isInputTriggered field, which displays or hides the search bar
     */
    triggerSearchInput() {
        this.isInputTriggered = !this.isInputTriggered;
    }
}

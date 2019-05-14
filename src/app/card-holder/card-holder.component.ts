import {Component, OnInit} from '@angular/core';
import {GithubService} from "../services/github.service";
import {QueriedRepositoryResponse, Repository} from "../models/models";
import {ActivatedRoute, ParamMap} from "@angular/router";

/**
 * Renders the queried repositories
 */
@Component({
    selector: 'app-card-holder',
    templateUrl: './card-holder.component.html',
    styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent implements OnInit {

    queriedRepositories: Repository[];
    shownRepositories: Repository[];
    sortBy: string;

    constructor(
        private githubService: GithubService,
        private route: ActivatedRoute
    ) {
    }

    /**
     * loads the repositories if it*s on the repository view after it has been initialized
     */
    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('repository')) {
                this.loadRepositories(paramMap.get('repository'));
            }
        });
    }

    /**
     * Load the requested repository
     *
     * @param query the string representation of the requested repository name
     */
    private loadRepositories(query: string) {
        this.githubService.getRepositories(query).then((response: QueriedRepositoryResponse) => {
            this.queriedRepositories = response.items;
            this.shownRepositories = this.queriedRepositories;
        })
    }

    /**
     * Filters the shown repositories and sorts them if it has been asked before
     *
     * @param filterBy filters the full name or the description as well if it's available
     * @return Boolean
     */
    filterRepositories(filterBy: string) {
        this.shownRepositories = this.queriedRepositories.filter((repository: Repository) => {
            if(repository.description){
                return repository.full_name.includes(filterBy) || repository.description.includes(filterBy);
            } else {
                return repository.full_name.includes(filterBy);
            }
        });
        this.sortRepositories(this.sortBy);
    }

    /**
     * Sorts the shown repositories
     *
     * @param sortBy a string which is acquired from the Option enum
     */
    sortRepositories(sortBy: string) {
        this.sortBy = sortBy;
        this.shownRepositories.sort((a: Repository, b: Repository) => {
            if (a[sortBy] > b[sortBy]) {
                return -1;
            }
        });
    }

    getOptions() {
        return Option;
    }

    getOptionKeys() {
        return Object.keys(Option);
    }
}

export enum Option {
    Stars = "stargazers_count",
    Forks = "forks_count",
    "Open issues" = "open_issues_count"
}

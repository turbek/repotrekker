import {Component, OnInit} from '@angular/core';
import {GithubService} from "../services/github.service";
import {QueriedRepositoryResponse, Repository} from "../models/models";
import {ActivatedRoute, ParamMap} from "@angular/router";

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

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('repository')) {
                this.loadRepositories(paramMap.get('repository'));
            }
        });
    }

    private loadRepositories(query: string) {
        this.githubService.getRepositories(query).then((response: QueriedRepositoryResponse) => {
            this.queriedRepositories = response.items;
            this.shownRepositories = this.queriedRepositories;
        })
    }

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

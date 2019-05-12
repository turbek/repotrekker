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
    queriedRepositoriesCount: string;

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
            this.queriedRepositoriesCount = `Total count: ${response.total_count}`;
        })
    }

}

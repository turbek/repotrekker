import {Component, OnInit} from '@angular/core';
import {GithubService} from "../services/github.service";
import {QueriedRepositoryResponse, Repository} from "../models/models";

@Component({
    selector: 'app-card-holder',
    templateUrl: './card-holder.component.html',
    styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent implements OnInit {

    queriedRepositories: Repository[];
    queriedRepositoriesCount: string;

    constructor(private githubService: GithubService) {
    }

    ngOnInit() {
        this.githubService.getRepositories().subscribe(
            (response: QueriedRepositoryResponse) => {
                this.queriedRepositories = response.items;
                this.queriedRepositoriesCount = `Total count: ${response.total_count}`;
            }
        );
    }

}

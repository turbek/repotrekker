import {Component, OnInit} from '@angular/core';
import {Issue, QueriedIssuesResponse} from "../models/models";
import {GithubService} from "../services/github.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

/**
 * Renders the issues of a repository
 */
@Component({
  selector: 'app-issues-holder',
  templateUrl: './issue-holder.component.html',
  styleUrls: ['./issue-holder.component.scss']
})
export class IssueHolderComponent implements OnInit {

    queriedIssues: Issue[];

    constructor(
        private githubService: GithubService,
        private route: ActivatedRoute
    ) {
    }

    /**
     * Loads the issues of a repository after it's been initialized
     * only if the path includes the userName and the repositoryName
     */
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('user') && paramMap.has('repository')) {
                this.githubService.loadIssuesForRepository(paramMap.get('user'), paramMap.get('repository'))
                    .then((response: QueriedIssuesResponse) => {
                        this.queriedIssues = response.items;
                    });
            }
        });
    }

}

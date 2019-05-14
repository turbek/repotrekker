import {Component, OnInit} from '@angular/core';
import {Issue, QueriedIssuesResponse} from "../models/models";
import {GithubService} from "../services/github.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

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

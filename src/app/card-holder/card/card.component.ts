import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() repoName: string;
    @Input() description: string;
    @Input() forksCount: number;
    @Input() stargazersCount: number;
    @Input() openIssuesCount: number;
    @Input() avatarUrl: string;

    constructor() {
    }

    ngOnInit() {
    }

}

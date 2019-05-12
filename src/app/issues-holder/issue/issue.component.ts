import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

    @Input() title: string;
    @Input() userName: string;
    @Input() userUrl: string;
    @Input() state: string;
    @Input() commentsCount: number;
    @Input() avatarUrl: string;
    @Input() created: string | Date;
    @Input() issueUrl: string;

    constructor() {
    }

    ngOnInit() {
        this.created = new Date(this.created).toLocaleDateString("en-US");
    }

}

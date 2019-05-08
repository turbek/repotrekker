import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

    @Input() title: string;
    @Input() userName: string;
    @Input() state: string;
    @Input() comments: number;
    @Input() created: string;

    constructor() {
    }

    ngOnInit() {
    }

}

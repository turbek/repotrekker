import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() repoName: string;
    @Input() repoUrl: string;
    @Input() userName: string;
    @Input() userUrl: string;
    @Input() description: string;
    @Input() forksCount: number;
    @Input() stargazersCount: number;
    @Input() openIssuesCount: number;
    @Input() avatarUrl: string;
    partialDescription: string;
    isDescriptionExpanded: boolean;
    sliceDescriptionAt: number = 100;

    constructor() {
    }

    ngOnInit() {
        if(this.isDescriptionTooLong()){ //TODO change this logic
            this.partialDescription = this.description.slice(0, this.sliceDescriptionAt);
            this.partialDescription += '...';
        } else {
            this.partialDescription = this.description;
        }
    }

    isDescriptionTooLong(){
        return this.description ? this.description.length > this.sliceDescriptionAt : false;
    }
}

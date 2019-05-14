import {Component, Input, OnInit} from '@angular/core';

/**
 * The representation of a repository
 */
@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
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

    /**
     * slices the description if it's too long to conveniently display it.
     *
     * sets the partial description for the view
     */
    ngOnInit() {
        if(this.isDescriptionTooLong()){ //TODO change this logic
            this.partialDescription = this.description.slice(0, this.sliceDescriptionAt);
            this.partialDescription += '...';
        } else {
            this.partialDescription = this.description;
        }
    }

    /**
     * Checks whether the description is too long the render
     *
     * @return Boolean
     */
    isDescriptionTooLong(){
        return this.description ? this.description.length > this.sliceDescriptionAt : false;
    }
}

import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ProgressBarService} from "../services/progress-bar.service";

/**
 * Renders the progress bar
 */
@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

    isLoading: Observable<boolean>;

    constructor(private progressBarService: ProgressBarService) {
    }

    ngOnInit() {
        this.isLoading = this.progressBarService.getProgressBarState();
    }

}

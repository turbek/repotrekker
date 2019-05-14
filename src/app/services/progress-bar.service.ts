import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

/**
 * The service which stores the current state of the progress bar
 */
@Injectable({providedIn: "root"})
export class ProgressBarService {

    private prograssBarState = new Subject<boolean>();

    /**
     * when called, it sets the progress bar visible
     */
    show(): void {
        this.prograssBarState.next(true);
    }

    /**
     * when called, it hides the progress bar from the display
     */
    hide(): void {
        this.prograssBarState.next(false);
    }

    /**
     * Returns the state of the progress bar
     *
     * @return Observable<boolean>
     */
    getProgressBarState(): Observable<boolean> {
        return this.prograssBarState.asObservable();
    }

}

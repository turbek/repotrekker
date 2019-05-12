import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class ProgressBarService {

    private prograssBarState = new Subject<boolean>();

    show(): void {
        this.prograssBarState.next(true);
    }

    hide(): void {
        this.prograssBarState.next(false);
    }

    getProgressBarState(): Observable<boolean> {
        return this.prograssBarState.asObservable();
    }

}

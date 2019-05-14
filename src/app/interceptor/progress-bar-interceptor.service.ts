import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgressBarService} from "../services/progress-bar.service";
import {tap} from "rxjs/operators";

/**
 * The service catches every outgoing request
 */
@Injectable({providedIn: "root"})
export class ProgressBarInterceptorService implements HttpInterceptor {

    constructor(private progressBarService: ProgressBarService) {
    }

    /**
     * Shows the progress bar at an outgoing request and hides after the response arrives
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressBarService.show();

        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.progressBarService.hide();
                }
            },
            (error: any) => {
                this.progressBarService.hide();
            }));
    }
}

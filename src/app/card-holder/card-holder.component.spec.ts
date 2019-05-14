import {CardHolderComponent} from "./card-holder.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {Subject} from "rxjs";
import {GithubService} from "../services/github.service";

class ActivatedRouteStub {
    private subject = new Subject();

    setParamMap(value) {
        this.subject.next(convertToParamMap(value));
    }

    get paramMap() {
        return this.subject.asObservable();
    }
}

xdescribe('CardHolderComponent: IT', () => { //TODO ?
    let component: CardHolderComponent;
    let fixture: ComponentFixture<CardHolderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [CardHolderComponent],
            providers: [
                GithubService,
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
            ]
        });
        fixture = TestBed.createComponent(CardHolderComponent);
        component = fixture.componentInstance;
    });

    it('#filterRepositories should filter the queried repositores', () => {
        let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
        route.setParamMap({repository: 'repository'});
        let githubService = TestBed.get(GithubService);
        let spy = spyOn(githubService,'getRepositories').and.returnValue(Promise.resolve([]));

    });

    it('#sortRepositories should sort the queried repositores', () => {

    });

});

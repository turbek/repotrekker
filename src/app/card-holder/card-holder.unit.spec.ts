import {CardHolderComponent} from "./card-holder.component";
import {GithubService} from "../services/github.service";
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";


class Repository {
    name: string;
    owner: {
        avatar_url: string;
        url: string;
        login: string;
        html_url: string;
    };
    full_name: string;
    html_url: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    open_issues_count: number;
    issues_url: string;
}

function createRepositories(): Repository[] {
    let repositories = [];

    let repo1 = new Repository();
    repo1.full_name = "fullname";
    repo1.description = "description";
    repositories.push(repo1);

    let repo2 = new Repository();
    repo2.full_name = "fullname2";
    repositories.push(repo2);

    return repositories;
}

describe('CardHolderComponent: UNIT', () => {
    let component: CardHolderComponent;
    let httpHandlerMock = new class extends HttpHandler {
        handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
            return undefined;
        }
    };
    let githubServiceMock = new GithubService(new HttpClient(httpHandlerMock));

    beforeAll(() => {
        component = new CardHolderComponent(githubServiceMock, new ActivatedRoute());
        component.queriedRepositories = createRepositories();
    });

    it('#filterRepositories should filter by description if it\'s not null', () => {
        component.filterRepositories("description");

        expect(component.shownRepositories.length).toBe(1);
    });

    it('#filterRepositories should return both repos if filtered by name', () => {
        component.filterRepositories("name");

        expect(component.shownRepositories.length).toBe(2);
    });

});

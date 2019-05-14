import {GithubService} from "./github.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

let mockResponse = {
    "total_count": 2,
    "incomplete_results": false,
    "items": []
};

describe('GithubService: UNIT', () => {
    let service: GithubService;
    let mockHttp = new HttpClient(null);

    beforeEach(() => {
        service = new GithubService(mockHttp);
    });

    it('#loadRepositoriesByName returns the repositories and sets the queriedName field',() => {
        spyOn(mockHttp, 'get').and.returnValue(of(mockResponse));

        let response = service.loadRepositoriesByName("repoName");

        response.then(res => {
            expect(res).toBe(mockResponse);
            expect(service.getSearchedRepositoryName()).toBe("repoName");
        })

    })


});

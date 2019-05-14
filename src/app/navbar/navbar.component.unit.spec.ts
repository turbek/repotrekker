import {NavbarComponent} from "./navbar.component";
import {GithubService} from "../services/github.service";

class LocationMock {
    path = () => {return ""};
    isCurrentPathEqualTo: any;
    normalize: any;
    prepareExternalUrl: any;
    go: any;
    replaceState: any;
    forward: any;
    back: any;
    subscribe: any;
}

describe('NavbarComponent: UNIT', () => {
    let component: NavbarComponent;
    let locationMock: LocationMock;
    let githubServiceMock: GithubService;

    beforeEach(() => {
        locationMock = new LocationMock();
        githubServiceMock = new GithubService(null);
        component = new NavbarComponent(locationMock, githubServiceMock);
    });

    it('#isIssuesPageActive should return TRUE if issues page is active', () => {
        let spy = spyOn(locationMock, 'path').and.returnValue("issues");

        let isActive = component.isIssuesPageActive();

        expect(spy).toHaveBeenCalled();
        expect(isActive).toBeTruthy();
    });

    it('#isIssuesPageActive should return FALSE if issues page is NOT active', () => {
        let spy = spyOn(locationMock, 'path').and.returnValue("loremIpsum");

        let isActive = component.isIssuesPageActive();

        expect(spy).toHaveBeenCalled();
        expect(isActive).toBeFalsy();
    });

    it('#getCurrentRepositoryName should return the full name of the queried repository', () => {
        let expectedUserName = "userName";
        let expectedRepoName = "repoName";
        let spy = spyOn(githubServiceMock, 'getCurrentRepositoryDetails').and.returnValue({ userName: expectedUserName, repositoryName: expectedRepoName });

        component.getCurrentRepositoryName();

        expect(spy).toHaveBeenCalled();
        expect(component.getCurrentRepositoryName()).toContain(expectedUserName);
        expect(component.getCurrentRepositoryName()).toContain(expectedRepoName);
    });

    it('#isSearchInputShown should return TRUE if the basePath is NOT active and the width GREATER than 500px', () => {
        component.innerWidth = 501;
        let spy = spyOn(locationMock, 'path').and.returnValue("notbasepath");

        let isShown = component.isSearchInputShown();

        expect(spy).toHaveBeenCalled();
        expect(isShown).toBeTruthy();
    });

    it('#isSearchInputShown should return FALSE if the basePath is NOT active and the width LESS than 500px', () => {
        component.innerWidth = 1;
        let spy = spyOn(locationMock, 'path').and.returnValue("notbasepath");

        let isShown = component.isSearchInputShown();

        expect(spy).toHaveBeenCalled();
        expect(isShown).toBeFalsy();
    });

    it('#isSearchInputShown should return FALSE if the basePath is active', () => {
        component.innerWidth = 501;
        let spy = spyOn(locationMock, 'path').and.returnValue("");

        let isShown = component.isSearchInputShown();

        expect(spy).toHaveBeenCalled();
        expect(isShown).toBeFalsy();
    });

    it('#isSearchInputShown should return FALSE if the width is LESS than 500px', () => {
        component.innerWidth = 1;
        let spy = spyOn(locationMock, 'path').and.returnValue("notbasepath");

        let isShown = component.isSearchInputShown();

        expect(spy).toHaveBeenCalled();
        expect(isShown).toBeFalsy();
    });

});

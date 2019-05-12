import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {QueriedIssuesResponse, QueriedRepositoryResponse} from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private readonly API_URL = `https://api.github.com`;
    private repositoryStore: QueriedRepositoryResponse = null;
    private issueStore = new Subject<QueriedIssuesResponse>();
    private queriedRepositoryName: string;
    private currentlyLoadedRepositoryDetails = { userName: "", repositoryName: "" };

    constructor(private http: HttpClient) {
    }

    async loadRepositoriesByName(repositoryName: string): Promise<QueriedRepositoryResponse> {
        this.repositoryStore = null;
        this.queriedRepositoryName = repositoryName;
        let response = await this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=${repositoryName}`).toPromise();
        this.repositoryStore = response;
        return response;
    }

    async getRepositories(repositoryName: string): Promise<QueriedRepositoryResponse> {
        if (this.isRepositoryStoreNotLoaded(repositoryName)) {
            return await this.loadRepositoriesByName(repositoryName);
        }
        return Promise.resolve(this.repositoryStore);
    }

    private isRepositoryStoreNotLoaded(repositoryName: string) {
        return !this.repositoryStore || repositoryName !== this.currentlyLoadedRepositoryDetails.repositoryName;
    }

    loadIssuesForRepository(userName: string, repositoryName: string) {
        this.currentlyLoadedRepositoryDetails.userName = userName;
        this.currentlyLoadedRepositoryDetails.repositoryName = repositoryName;
        this.http.get<QueriedIssuesResponse>(`${this.API_URL}/search/issues?q=repo:${userName}/${repositoryName}`)
            .subscribe(
                (response: QueriedIssuesResponse) => {
                    this.issueStore.next(response);
                },
                (error: HttpErrorResponse) => console.error(error)
            )
    }

    getIssues() {
        return this.issueStore.asObservable();
    }

    getSearchedRepositoryName() {
        return this.queriedRepositoryName || this.currentlyLoadedRepositoryDetails.repositoryName;
    }

    getCurrentRepositoryDetails() {
        return this.currentlyLoadedRepositoryDetails;
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QueriedIssuesResponse, QueriedRepositoryResponse} from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private readonly API_URL = `https://api.github.com`;
    private repositoryStore: QueriedRepositoryResponse = null;
    private queriedRepositoryName: string;
    private currentlyLoadedRepositoryDetails: { userName: string, repositoryName: string } = { userName: "", repositoryName: "" };

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
        return !this.repositoryStore || this.queriedRepositoryName !== repositoryName;
    }

    async loadIssuesForRepository(userName: string, repositoryName: string): Promise<QueriedIssuesResponse> {
        this.currentlyLoadedRepositoryDetails.userName = userName;
        this.currentlyLoadedRepositoryDetails.repositoryName = repositoryName;
        return await this.http.get<QueriedIssuesResponse>(`${this.API_URL}/search/issues?q=repo:${userName}/${repositoryName}`).toPromise();
    }

    getSearchedRepositoryName() {
        return this.queriedRepositoryName || this.currentlyLoadedRepositoryDetails.repositoryName;
    }

    getCurrentRepositoryDetails(): { userName: string, repositoryName: string } {
        return this.currentlyLoadedRepositoryDetails;
    }
}

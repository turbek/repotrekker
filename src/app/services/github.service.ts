import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QueriedIssuesResponse, QueriedRepositoryResponse} from "../models/models";

/**
 * A service for querying the github API
 */
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

    /**
     * Saves the response from the API to it's internal store
     *
     * @param repositoryName the string which is used to query the API
     * @return QueriedRepositoryResponse which holds the list of repositories
     */
    async loadRepositoriesByName(repositoryName: string): Promise<QueriedRepositoryResponse> {
        this.repositoryStore = null;
        this.queriedRepositoryName = repositoryName;
        let response = await this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=${repositoryName}`).toPromise();
        this.repositoryStore = response;
        return response;
    }

    /**
     * Returns the stored response from the API or returns a new response
     * if the asked name is not already saved
     *
     * @param repositoryName the string representation of the repo name which the callee wants to load
     * @return QueriedRepositoryResponse either the stored or new response
     */
    async getRepositories(repositoryName: string): Promise<QueriedRepositoryResponse> {
        if (this.isRepositoryStoreNotLoaded(repositoryName)) {
            return await this.loadRepositoriesByName(repositoryName);
        }
        return Promise.resolve(this.repositoryStore);
    }

    /**
     * Checks whether the repository is already loaded
     *
     * @param repositoryName the string representation of the repo name which the callee wants to load
     * @return Boolean
     */
    private isRepositoryStoreNotLoaded(repositoryName: string) {
        return !this.repositoryStore || this.queriedRepositoryName !== repositoryName;
    }

    /**
     * Returns the issues of a requested repository
     *
     * @param userName the string representation of the user's name of the repository
     * @param repositoryName the string representation of the repository's name
     * @return QueriedIssuesResponse which holds the issues of the repository
     */
    async loadIssuesForRepository(userName: string, repositoryName: string): Promise<QueriedIssuesResponse> {
        this.currentlyLoadedRepositoryDetails.userName = userName;
        this.currentlyLoadedRepositoryDetails.repositoryName = repositoryName;
        return await this.http.get<QueriedIssuesResponse>(`${this.API_URL}/search/issues?q=repo:${userName}/${repositoryName}`).toPromise();
    }

    /**
     * Returns the loaded repository's name or the name of the repository which is currently viewed
     *
     * @return String
     */
    getSearchedRepositoryName() {
        return this.queriedRepositoryName || this.currentlyLoadedRepositoryDetails.repositoryName;
    }

    /**
     * Returns the details of the currently viewed repository
     *
     * @return { userName: string, repositoryName: string }
     */
    getCurrentRepositoryDetails(): { userName: string, repositoryName: string } {
        return this.currentlyLoadedRepositoryDetails;
    }
}

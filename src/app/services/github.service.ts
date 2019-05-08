import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {QueriedIssuesResponse, QueriedRepositoryResponse} from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private API_URL = `https://api.github.com`;
    private repositoryStore = new Subject<QueriedRepositoryResponse>();
    private issueStore = new Subject<QueriedIssuesResponse>();


    constructor(private http: HttpClient) {
    }

    loadRepositoriesByName(repositoryName: string) {
        this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=${repositoryName}`)
        //this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=bootstrap`)
            .subscribe(
                (response: QueriedRepositoryResponse) => this.repositoryStore.next(response),
                (error: HttpErrorResponse) => console.error(error)
            )
    }

    getRepositories() {
        return this.repositoryStore.asObservable();
    }

    loadIssuesForRepository(repositoryFullName: string) {
        this.http.get<QueriedIssuesResponse>(`${this.API_URL}/search/issues?q=repo:${repositoryFullName}`)
            .subscribe(
                (response: QueriedIssuesResponse) => this.issueStore.next(response),
                (error: HttpErrorResponse) => console.error(error)
            )
    }

    getIssues() {
        return this.issueStore.asObservable();
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {QueriedRepositoryResponse} from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private API_URL = `https://api.github.com`;
    private repositoryStore = new Subject<QueriedRepositoryResponse>();


    constructor(private http: HttpClient) {
    }

    loadRepositoriesByName(repositoryName: string) {
        //this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=${repositoryName}`)
        this.http.get<QueriedRepositoryResponse>(`${this.API_URL}/search/repositories?q=bootstrap`)
            .subscribe(
                (response: QueriedRepositoryResponse) => this.repositoryStore.next(response),
                (error: HttpErrorResponse) => console.error(error)
            )
    }

    getRepositories(){
        return this.repositoryStore.asObservable();
    }
}

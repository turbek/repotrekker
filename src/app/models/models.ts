export interface Repository {
    full_name: string,
    owner: {
        avatar_url: string,
        url: string,
    },
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    issues_url: string,

}

export interface QueriedRepositoryResponse {
    total_count: number,
    items: Repository[]
}

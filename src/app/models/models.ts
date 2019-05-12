export interface QueriedRepositoryResponse {
    total_count: number,
    items: Repository[]
}

export interface QueriedIssuesResponse {
    total_count: number,
    items: Issue[]
}

export interface Repository {
    name: string,
    owner: {
        avatar_url: string,
        url: string,
        login: string,
        html_url: string
    },
    full_name: string,
    html_url: string,
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    issues_url: string,
}

export interface Issue {
    html_url: string,
    title: string,
    user: {
        login: string,
        avatar_url: string,
        html_url: string
    },
    state: string,
    comments: number,
    created_at: string,
}

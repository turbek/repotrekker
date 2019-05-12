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
    html_url: string,
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    issues_url: string,
}

export interface Issue {
    "url": string,
    "repository_url": string,
    "labels_url": string,
    "comments_url": string,
    "events_url": string,
    "html_url": string,
    "id": number,
    "node_id": string,
    "number": number,
    "title": string,
    "user": {
        "login": string,
        "id": number,
        "node_id": string,
        "avatar_url": string,
        "gravatar_id": string,
        "url": string,
        "html_url": string,
        "followers_url": string,
        "following_url": string,
        "gists_url": string,
        "starred_url": string,
        "subscriptions_url": string,
        "organizations_url": string,
        "repos_url": string,
        "events_url": string,
        "received_events_url": string,
        "type": string,
        "site_admin": boolean
    },
    "labels": [
        {
            "id": number,
            "node_id": string,
            "url": string,
            "name": string,
            "color": string,
            "default": boolean
        },
        {
            "id": number,
            "node_id": string,
            "url": string,
            "name": string,
            "color": string,
            "default": boolean
        }
        ],
    "state": string,
    "locked": boolean,
    "comments": number,
    "created_at": string,
    "updated_at": string,
    "closed_at": string,
    "author_association": string,
    "body": string,
    "score": number
}

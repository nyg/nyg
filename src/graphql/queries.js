import { gql } from '@apollo/client/core/index.js'

/* Fragments */

export const gqlGistFragment = gql`
   fragment GistDetail on Gist {
      id
      url
      name
      description
      stargazerCount
      createdAt
      updatedAt
      forks(first: 1, orderBy: { direction: DESC, field: CREATED_AT }) {
         totalCount
         nodes {
            createdAt
            owner { login }
         }
      }
      comments(last: 1) {
         totalCount
         nodes {
            createdAt
            author { login }
         }
      }
      files {
         name
      }
   }`

export const gqlRepositoryFragment = gql`
   fragment RepositoryDetail on Repository {
      id
      createdAt
      description
      forkCount
      issues { totalCount }
      name
      primaryLanguage { name }
      pullRequests { totalCount }
      pushedAt
      stargazerCount
      updatedAt
      url
   }`

/* Queries */

export const gqlUserInfo = gql`{
   viewer {
      id
      createdAt
      pullRequests { totalCount }
      issues { totalCount }
      issueComments { totalCount }
      repositoriesContributedTo { totalCount }
      repositoryDiscussions { totalCount }
      repositoryDiscussionComments { totalCount }
      watching { totalCount }
      starredRepositories { totalCount }
      following { totalCount }
      followers { totalCount }
      contributionsCollection { contributionYears }
      repositories(affiliations: OWNER, isArchived: false, isFork: false, privacy: PUBLIC) {
         totalCount
      }
      gists(orderBy: { direction: DESC, field: CREATED_AT }, privacy: ALL) {
         totalCount
      }
      publicKeys(first: 1) {
         totalCount
         nodes {
            id
            fingerprint
         }
      }
    }
}`

export const gqlUserGists = gql`
   ${gqlGistFragment}
   query Gists($count: Int!, $cursor: String) {
      viewer {
         id
         gists(first: $count, after: $cursor, orderBy: { field: UPDATED_AT, direction: ASC }, privacy: PUBLIC) {
            totalCount
            pageInfo {
               hasNextPage
               endCursor
            }
            edges {
               node {
                  ...GistDetail
               }
            }
         }
      }
   }`

export const gqlUserRepositories = gql`
   ${gqlRepositoryFragment}
   query Repository($count: Int!, $cursor: String) {
      viewer {
         id
         repositories(first: $count, after: $cursor, orderBy: { field: UPDATED_AT, direction: ASC}, privacy: PUBLIC) {
            totalCount
            pageInfo {
               hasNextPage
               endCursor
            }
            edges {
               node {
                  ...RepositoryDetail
               }
            }
         }
      }
   }`

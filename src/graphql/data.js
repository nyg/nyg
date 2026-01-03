import 'dotenv/config'

import { ApolloClient, gql, HttpLink } from '@apollo/client'
import { gqlGistFragment, gqlPullRequestFragment, gqlRepositoryFragment, gqlUserGists, gqlUserInfo, gqlUserPullRequests, gqlUserRepositories } from './queries.js'
import { InMemoryCache } from '@apollo/client/cache'
import { relayStylePagination } from '@apollo/client/utilities'


function RelayStylePaginationFetcher(observableQuery, extractField) {
   this.fetchAll = async () => {
      let hasNext = true, cursor = null
      while (hasNext) {
         const { data } = await observableQuery.fetchMore({ variables: { cursor } })
         hasNext = extractField(data).pageInfo.hasNextPage
         cursor = extractField(data).pageInfo.endCursor
      }
   }
}

const client = new ApolloClient({
   link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: { Authorization: `Bearer ${process.env.USER_TOKEN}` }
   }),
   cache: new InMemoryCache({
      typePolicies: {
         User: {
            fields: {
               // Note: https://stackoverflow.com/a/78084689
               gists: relayStylePagination(['privacy']),
               repositories: relayStylePagination(['privacy']),
               pullRequests: relayStylePagination()
            }
         }
      }
   })
})

// Fetch general user information
await client.query({ query: gqlUserInfo })

// Fetch all public gists
const gistQuery = client.watchQuery({ query: gqlUserGists, variables: { count: 100 } })
await new RelayStylePaginationFetcher(gistQuery, data => data.viewer.gists).fetchAll()

// Fetch all public repositories
const repositoryQuery = client.watchQuery({ query: gqlUserRepositories, variables: { count: 100 } })
await new RelayStylePaginationFetcher(repositoryQuery, data => data.viewer.repositories).fetchAll()

// Fetch all pull requests
const pullRequestQuery = client.watchQuery({ query: gqlUserPullRequests, variables: { count: 100 } })
await new RelayStylePaginationFetcher(pullRequestQuery, data => data.viewer.pullRequests).fetchAll()

// Retrieve data from cache
const { viewer } = await client.readQuery({
   query: gql`{
      viewer {
         login
         publicGists: gists(privacy: PUBLIC) {
            totalCount
            edges { node }
         }
         publicRepositories: repositories(privacy: PUBLIC) {
            totalCount
            edges { node }
         }
         pullRequests {
            totalCount
            edges { node }
         }
      }
   }`
})

export const gists = viewer.publicGists.edges
   .map(edge => client.readFragment({ id: edge.node.__ref, fragment: gqlGistFragment }))

export const repositories = viewer.publicRepositories.edges
   .map(edge => client.readFragment({ id: edge.node.__ref, fragment: gqlRepositoryFragment }))

const pullRequestsByRepository = viewer.pullRequests.edges
   .map(edge => client.readFragment({ id: edge.node.__ref, fragment: gqlPullRequestFragment }))
   .filter(pr => pr.repository.owner.login !== viewer.login)
   .filter(pr => !pr.repository.isPrivate)
   .reduce((prsByRepos, pr) => {
      prsByRepos[pr.repository.nameWithOwner] ??= {
         repo: pr.repository,
         prCount: 0,
         prs: []
      }
      prsByRepos[pr.repository.nameWithOwner].prs.push(pr)
      prsByRepos[pr.repository.nameWithOwner].prCount++
      return prsByRepos
   }, {})

export const pullRequests = Object.values(pullRequestsByRepository)

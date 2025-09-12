import 'dotenv/config'

import { ApolloClient, gql, HttpLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { relayStylePagination } from '@apollo/client/utilities'
import { gqlGistFragment, gqlRepositoryFragment, gqlUserGists, gqlUserRepositories, gqlUserInfo } from './queries.js'


function RelayStylePaginationFetcher(observableQuery, extractField) {
   this.fetchAll = async () => {
      let hasNext = true, cursor = null
      while (hasNext) {
         const { data } = await observableQuery.fetchMore({ variables: { cursor } })
         hasNext = extractField(data).pageInfo.hasNextPage
         cursor = extractField(data).pageInfo.endCursor
         console.log('has next / cursor', hasNext, cursor)
      }
   }
}

const client = new ApolloClient({

   link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
         Authorization: `Bearer ${process.env.USER_TOKEN}`
      }
   }),

   cache: new InMemoryCache({
      typePolicies: {
         User: {
            fields: {
               // Note: https://stackoverflow.com/a/78084689
               gists: relayStylePagination(['privacy']),
               repositories: relayStylePagination(['privacy'])
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

// Retrieve data from cache
const { viewer } = await client.readQuery({
   query: gql`{
      viewer {
         publicGists: gists(privacy: PUBLIC) {
            totalCount
            edges { node }
         }
         publicRepositories: repositories(privacy: PUBLIC) {
            totalCount
            edges { node }
         }
      }
   }`
})

export const gists = viewer.publicGists.edges
   .map(edge => edge.node.__ref)
   .map(ref => client.readFragment({ id: ref, fragment: gqlGistFragment }))

export const repositories = viewer.publicRepositories.edges
   .map(edge => edge.node.__ref)
   .map(ref => client.readFragment({ id: ref, fragment: gqlRepositoryFragment }))

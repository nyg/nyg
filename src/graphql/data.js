import { ApolloClient, gql } from '@apollo/client/core/index.js'
import { InMemoryCache } from '@apollo/client/cache/index.js'
import { relayStylePagination } from '@apollo/client/utilities/index.js'
import { gqlGistFragment, gqlUserGists, gqlUserInfo } from './queries.js'
import { githubToken } from '../../.env.js'


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
   uri: 'https://api.github.com/graphql',
   headers: { Authorization: `Bearer ${githubToken}` },
   cache: new InMemoryCache({
      typePolicies: {
         User: {
            fields: {
               // Note: https://stackoverflow.com/a/78084689
               gists: relayStylePagination(['privacy'])
            }
         }
      }
   })
})

await client.query({ query: gqlUserInfo })

const gistQuery = client.watchQuery({ query: gqlUserGists, variables: { count: 30 } })
await new RelayStylePaginationFetcher(gistQuery, data => data.viewer.gists).fetchAll()

const { viewer } = await client.readQuery({
   query: gql`{
      viewer {
         publicGists: gists(privacy: PUBLIC) {
            totalCount
            edges {
               node
            }
         }
      }
   }`
})

export const gists = viewer.publicGists.edges
   .map(edge => edge.node.__ref)
   .map(ref => client.readFragment({ id: ref, fragment: gqlGistFragment }))

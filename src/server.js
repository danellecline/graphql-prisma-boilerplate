import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()
 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // authentication, database, etc. goes here
    context(request) { 
        // console.log(request.request.headers)
        return {
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

export { server as default }

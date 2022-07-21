import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import message from './message'
import { PrismaClient } from '@prisma/client'

export default (prisma: PrismaClient) => {
    const { typeDefs: messageTypeDefs, resolvers: messageResolvers } = message(prisma);

    const typeDefs = `
       type Query {
            _empty: String
       }

       type Mutation {
            _empty: String
       }
    `

    const resolvers = {};

    return {
        typeDefs: mergeTypeDefs([
            typeDefs,
            messageTypeDefs,
        ]),
        resolvers: mergeResolvers([
            resolvers,
            messageResolvers
        ])
    }
}
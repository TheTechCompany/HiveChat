import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import message from './message'
import { PrismaClient } from '@prisma/client'
import channel from './channel'

export default (prisma: PrismaClient) => {
    const { typeDefs: channelTypeDefs, resolvers: channelResolvers } = channel(prisma);
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
            channelTypeDefs,
        ]),
        resolvers: mergeResolvers([
            resolvers,
            messageResolvers,
            channelResolvers
        ])
    }
}
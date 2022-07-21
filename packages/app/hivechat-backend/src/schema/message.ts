import { PrismaClient } from '@prisma/client'
import {nanoid} from 'nanoid'

export default (prisma: PrismaClient) => {
    const typeDefs = `
        extend type Query {
            messages(channel: String): [Message]
        }

        extend type Mutation {
            sendMessage(channel: String, message: String): Message
        }

        type Message {
            id: ID

            channel: String

            message: String

            sentAt: DateTime

            iamSender: Boolean
            sender: HiveUser
        }
    `

    const resolvers = {
        Message: {
            iamSender: (root: any, args: any, context: any) => {
                return root.sender == context?.jwt?.id;
            }
        },
        Query: {
            messages: async (root: any, args: any, context: any) => {
                const messages = await prisma.message.findMany({
                    where: {
                        channel: args.channel
                    }
                })
                return messages.map((x) => ({...x, sender: {id: x.sender}}))
            }
        },
        Mutation: {
            sendMessage: async (root: any, args: any, context: any) => {
                return await prisma.message.create({
                    data: {
                        id: nanoid(),
                        channel: args.channel,
                        message: args.message,
                        sentAt: new Date(),
                        sender: context?.jwt?.id
                    }
                })
            }
        }
    };

    return {
        typeDefs,
        resolvers
    }
}
import { PrismaClient } from '@prisma/client'
import {nanoid} from 'nanoid'

export default (prisma: PrismaClient) => {
    const typeDefs = `
        extend type Query {
            messages(channel: String, recipient: String): [Message]
        }

        extend type Mutation {
            sendMessage(channel: String, recipient: String, message: String): Message
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
                        OR: [
                            {channel: { id: args.channel, organisation: context?.jwt?.organisation } },
                            {sender:  args.recipient, recipient: context?.jwt?.id}
                        ]
                    }
                })
                return messages.map((x) => ({...x, sender: {id: x.sender}}))
            }
        },
        Mutation: {
            sendMessage: async (root: any, args: any, context: any) => {
                let recipient = {};
                if(args.recipient){
                    recipient = {recipient: args.recipient}
                }
                if(args.channel){
                    recipient = {...recipient, channelId: args.channel}
                }
                return await prisma.message.create({
                    data: {
                        id: nanoid(),
                        ...recipient,
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
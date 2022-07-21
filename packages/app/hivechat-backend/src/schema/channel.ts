import { PrismaClient } from "@prisma/client"

export default (prisma: PrismaClient) => {
    const typeDefs = `

        extend type Query {
            channels: [Channel]
        }

        type Channel {
            id: ID
            name: String

            members: [HiveUser]

            messages: [Message]

            createdAt: DateTime
            createdBy: HiveUser
            organisation: HiveOrganisation
        }
    `

    const resolvers = {
        Query: {
            channels: async (root: any, args: any, context: any) => {
                const channels = await prisma.channel.findMany({
                    where: {
                        OR: [
                            {members: {has: context?.jwt?.id}},
                            {createdBy: context?.jwt?.id}
                        ],
                        organisation: context?.jwt?.organisation
                    },
                    include: {
                        messages: true
                    }
                })

                return channels.map((channel) => ({
                    ...channel,
                    members: channel.members.map((member) => ({id: member})),
                    createdBy: {id: channel.createdBy},
                    organisation: {id: channel.organisation}
                }))
            }
        }
    };
    return {
        resolvers,
        typeDefs
    }
}
import express from 'express'

import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

import {HiveGraph} from '@hexhive/graphql-server'
import schema from './schema';

(async () => {
    const prisma = new PrismaClient();

    const app = express();

    const { typeDefs, resolvers } = schema(prisma)

    app.use(bodyParser.json());

    const graphServer = new HiveGraph({
        rootServer: process.env.ROOT_SERVER || "http://localhost:7000",
        dev: false,
        schema: {
            typeDefs,
            resolvers,
        },
    })

    await graphServer.init()

    app.use(graphServer.middleware)

    app.listen(9015, () => {
        console.log("HiveChat backend up on 9015")
    })
})();
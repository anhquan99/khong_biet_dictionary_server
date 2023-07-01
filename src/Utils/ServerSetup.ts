import express, {Express, Request} from 'express';
import { ApolloServer } from '@apollo/server';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {expressMiddleware} from '@apollo/server/express4';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

import env from './Config'
import typeDefs from '../Graphql/TypeDef/typeDef';
import resolvers from '../Graphql/Resolvers/Implement/Index';
import connectDb from './DbSetup';
import {AuthContext} from '../Middlewares/Token'

async function startServer() : Promise<void> 
{
    try
    {
        const app : Express = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer<AuthContext>({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: "bounded",
            plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
        });

        await server.start();

        app.use(
            '/',
            cors<cors.CorsRequest>(),
            bodyParser.json({limit : '50mb'}),
            graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
            expressMiddleware(server, {
                context : async ({req }) => ({req})
            })
        )
        await connectDb();

        await new Promise<void>((resolve) => httpServer.listen({port : env.PORT}, resolve));

        console.log(`Server is running on http://${env.HOST}:${env.PORT}`);
        
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

export default startServer;
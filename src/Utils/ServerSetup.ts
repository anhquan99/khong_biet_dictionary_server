import express, {Express} from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/dist/esm/standalone';

import env from './Config'
import typeDefs from '../Graphql/TypeDef/typeDef';
import resolvers from '../Graphql/Resolvers/Index';
import connectDb from './DbSetup';

async function startServer() : Promise<void> 
{
    try
    {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: "bounded"
        });
        await connectDb();
        server.start();
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

export default startServer;
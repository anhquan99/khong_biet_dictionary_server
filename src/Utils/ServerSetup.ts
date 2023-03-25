import express, {Express} from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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
        const {url} = await startStandaloneServer(server, {
            listen: {port: + env.PORT}
        });
        await connectDb();
        console.log(`Server is running on ${url}`);
        
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

export default startServer;
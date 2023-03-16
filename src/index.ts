import express, {Express} from 'express';
import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import mongoose from 'mongoose';

import {env} from './config';
import { resolvers } from './Data/Graphql/Resolvers/Words';
import {typeDefs} from './Data/Graphql/typeDef';

async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded"
    });
    
    const {url} = await startStandaloneServer(server, {listen: {port: env.PORT}});
    console.log(`Server is running on ${url}`)
}
startServer();
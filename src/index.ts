import express, {Express, Request, Response} from 'express';
import { ApolloServer } from 'apollo-server-express';
import {env} from './config';
import mongoose from 'mongoose';

async function startServer(){
    // const server = new ApolloServer({

    // });
    // await server.start();
    const app: Express = express();

    // server.applyMiddleware({app});
    mongoose.connect(env.MONGODB).then(() => {
        console.log("MongoDB connected");
        return app.listen(env.PORT);
    })
    .then(res => {
        console.log(`Server is running on http://${env.HOST}:${env.PORT}`)
    })
    .catch(err => {
        console.log(err);
    })
}
startServer();
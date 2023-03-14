import express, {Express, Request, Response} from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import {env} from './config';

const app: Express = express();
mongoose.connect(env.MONGODB, {useNewUrlParser: true} as ConnectOptions)
.then(() => {
    console.log("MongoDb connected");
})
.then(() => {
    app.listen(env.PORT);
    console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
})
.catch(err =>{
    console.log(err);
});


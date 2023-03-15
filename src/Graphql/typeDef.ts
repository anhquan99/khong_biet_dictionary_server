import { buildSchema } from "graphql";      

export const schema = buildSchema(`
    type Query{
        findWord: String
    },
    type Mutation{
        createWord: String
    }
`);
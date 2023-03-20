import {Words} from "./Words";
export const resolvers = {
    Query:{
        ...Words.Query,
    },
    Mutation:{
        ...Words.Mutation
    }
};
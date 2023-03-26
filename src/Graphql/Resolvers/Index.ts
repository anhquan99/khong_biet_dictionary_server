import Words from "./Words";
const resolvers = {
    Query:{
        ...Words.Query,
    },
    Mutation:{
        ...Words.Mutation
    }
};
export default resolvers;
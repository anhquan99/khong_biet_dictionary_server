import Meanings from "./Meanings";
import Pharses from "./Pharses";
import SpeechTypes from "./SpeechTypes";
import Users from "./Users";
import Words from "./Words";

const resolvers = {
    Query:{
        // ...Meanings.Query,
        // ...Pharses.Query,
        ...SpeechTypes.Query,
        ...Users.Query,
        ...Words.Query
    },
    Mutation:{
        // ...Meanings.Mutation,
        // ...Pharses.Mutation,
        ...SpeechTypes.Mutation,
        ...Users.Mutation,
        ...Words.Mutation
    }
};
export default resolvers;
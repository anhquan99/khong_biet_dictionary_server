import Meanings from "./Meanings";
import Pharses from "./Pharses";
import SpeechTypes from "./SpeechTypes";
import Users from "./Users";
import Words from "./Words";
import Bookmarks from "./Bookmark";

const resolvers = {
    Query:{
        ...Bookmarks.Query,
        ...Meanings.Query,
        ...Pharses.Query,
        ...SpeechTypes.Query,
        ...Users.Query,
        ...Words.Query
    },
    Mutation:{
        ...Bookmarks.Mutation,
        ...Meanings.Mutation,
        ...Pharses.Mutation,
        ...SpeechTypes.Mutation,
        ...Users.Mutation,
        ...Words.Mutation
    }
};
export default resolvers;
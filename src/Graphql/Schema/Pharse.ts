import { model, Schema } from "mongoose";  

const PharseSchema = new Schema({
    Pharse : {
        type : String,
        require : true
    },
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        require : true
    },
    Words : [String]
});

const PharseModel = model("Pharse", PharseSchema);
export default PharseModel;
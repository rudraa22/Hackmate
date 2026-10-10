import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    pairKey:
    {
        type:String,
        required: true,
        unique:true
    },
},

    {timestamps: true}
);

export default mongoose.model("Match" , matchSchema);

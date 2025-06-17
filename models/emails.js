import mongoose from "mongoose";
import { model, Schema, models} from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {type:String},
    name: {type:String},
})

export default mongoose.models.Email || mongoose.model("Email", emailSchema)  // 
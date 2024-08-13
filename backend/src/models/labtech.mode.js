import mongoose, { Schema } from "mongoose";
const labtechSchema=new Schema (
    {
       username:{
        type: String,
        required: [true, "username required"],
        unique: true,
        trim: true,
        lowercase:true
       }, 
       email:{
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase:true
       },
       contactno:{
        type: String,
        required: true,
        unique: true,
        trim: true,
       },
       role:{
        type: String,
        default:'doctor'
       },
       hospitalid:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
       },
        password:{
            type:String,
            required:[true,'password required'],
            trim:true,
        },
        refreshtoken:{
            type:String
        },

        status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
        

    },
    {
        timestamps:true,
    }
)
export const labtech = mongoose.model("Labtech", labtechSchema)

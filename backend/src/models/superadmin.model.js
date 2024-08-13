import mongoose, { Schema } from "mongoose";
const superadminSchema=new Schema (
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
        default:'superadmin'
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
export const superadmin = mongoose.model("Superadmin", superadminSchema)

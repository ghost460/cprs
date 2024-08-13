import mongoose, { Schema } from "mongoose";
const hospitalSchema=new Schema (
    {
      hospitalname:{
        type: String,
        required: [true, "username required"],
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
        default:'admin'
       },
       address:{
        type: String,
        required: true,
        trim: true,
       },

        specialization: {
            type: String, 
            required: true,
            trim:true
        }, // For doctors
        Numberofbeds:{
            type:Number,
            required: true,
        },
        username:{
            type: String,
            unique:true,
            required:true,
            trim: true
        } ,
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
export const Hospital = mongoose.model("Hospital", hospitalSchema)

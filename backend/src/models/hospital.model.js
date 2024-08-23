import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
hospitalSchema.pre("save", async   function(next){
    if(!this.isModified("password")) return next();
 this.password =bcrypt.hash(this.password, 10)
 next()   

})
hospitalSchema.method.ispasswordcorrect= async function (password) {
return await bcrypt.compare(password, this.password)    
}
hospitalSchema.method.generateAccessToken=function(){
return jwt.sign(
    {
        _id: this._id,
        email:this.email,
        hospitalname:this.hospitalname,
        username:this.username

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)    
}
hospitalSchema.method.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )    
    }
export const Hospital = mongoose.model("Hospital", hospitalSchema)

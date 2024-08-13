import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const doctorSchema=new Schema (
    {
        fullname:{
            type: String,
            required: [true, "username required"],
            unique: true,
            trim: true,
            lowercase:true
           }, 
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
       
        specialization: String, // For doctors
        licenseNumber: String, // For doctors
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
doctorSchema.pre("save", async   function(next){
    if(!this.isModified("password")) return next();
 this.password =bcrypt.hash(this.password, 10)
 next()   

})
doctorSchema.method.ispasswordcorrect= async function (password) {
return await bcrypt.compare(password, this.password)    
}
doctorSchema.method.generateAccessToken=function(){
return jwt.sign(
    {
        _id: this._id,
        email:this.email,
        fullname: this.fullname,
        username:this.username

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)    
}
doctorSchema.method.generateRefreshToken=function(){
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
export const doctor = mongoose.model("Doctor", doctorSchema)

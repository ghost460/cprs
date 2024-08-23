// models/Patient.js

const mongoose = require('mongoose');
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const medicalHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
  },
  medications: [{
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
  }],
  notes: {
    type: String,
  },
}, { _id: false }); // Set _id: false to prevent creating an _id for each subdocument

const allergySchema = new mongoose.Schema({
  allergy: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe'],
    required: true,
  },
  reaction: {
    type: String,
  },
}, { _id: false });

const vaccinationSchema = new mongoose.Schema({
  vaccine: {
    type: String,
    required: true,
  },
  dateAdministered: {
    type: Date,
    required: true,
  },
  nextDoseDue: {
    type: Date,
  },
}, { _id: false });

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  medicalHistory: [medicalHistorySchema],
  allergies: [allergySchema],
  vaccinations: [vaccinationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on every save
patientSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

patientSchema.pre("save", async   function(next){
    if(!this.isModified("password")) return next();
 this.password =bcrypt.hash(this.password, 10)
 next()   

})
patientSchema.method.ispasswordcorrect= async function (password) {
return await bcrypt.compare(password, this.password)    
}
patientSchema.method.generateAccessToken=function(){
return jwt.sign(
    {
        _id: this._id,
        email:this.email,
        fullName: this.fullName,
        username:this.username

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)    
}
patientSchema.method.generateRefreshToken=function(){
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

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
